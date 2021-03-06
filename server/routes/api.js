const { 
        getReps,
        getCommits,
        getDiff,
        lsTree,
        show,
        clone,
        deleteRepository
    } = require('../git')

const path = require('path')

const express = require('express')
const router = express.Router()

const minimist = require('minimist')
const argv = minimist(process.argv.slice(2))
const pathToReps = argv.path

router.get('/', function(req, res, next) {
    getReps(pathToReps, (err, files) => {
        if(err) return next()

        res.json(files)
        res.end()
    })
})

router.get('/:repositoryId/commits/:commitHash', function(req, res, next) {  
    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash
    }
    getCommits(options, (err, commits) => {
        if(err) return next()

        res.json(commits)
    })
})

router.get('/:repositoryId/commit/:commitHash', function(req, res, next) {  
    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash,
        number: 1,
    }
    getCommits(options, (err, commits) => {
        if(err) return next()

        res.json(commits[0])
    })
})

router.get('/:repositoryId/commits/:commitHash/page/(:pageNumber)(/size/:pageSize)?', function(req, res, next) {
    const pageNumber = Number(req.params.pageNumber)
    if(typeof pageNumber !== 'number' || pageNumber < 0) return next()

    let pageSize = Number(req.params.pageSize);
    pageSize = (typeof pageSize === 'number' || pageSize > 0) && Math.floor(pageSize) || 30

    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash,
        number: pageSize,
        skip: Math.floor(pageNumber) * pageSize
    }
    getCommits(options, (err, commits) => {
        if(err) return next()

        res.json(commits)
    })
})

router.get('/:repositoryId/commits/:commitHash/diff', function(req, res, next) {  
    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash
    }
    getDiff(options, (err, diff) => {
        if(err) return next()

        res.json(diff)
    })
})

router.get('/:repositoryId/(:tree(tree)/:commitHash?/:path([^?#]*)?)?', function(req, res, next) {
    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash,
        path: req.params.path && req.params.path.replace(/^\//, '') || ''
    }
    lsTree(options, (err, dir) => {
        if(err) return next()

        res.json(dir)
    })
})

router.get('/:repositoryId/blob/:commitHash/*', function(req, res, next){
    const options = {
        cwd: path.resolve(pathToReps, req.params.repositoryId),
        hash: req.params.commitHash,
        path: req.params['0'] && req.params['0'].replace(/^\//, '') || ''
    }
    show(options, (err, file) => {
        if(err) return next()

        res.json(file)
    })
})

router.post('/', function(req, res){
    const options = {
        cwd: pathToReps,
        path: req.body.url
    }
    clone(options, (err, data) => {
        if(err) {
            res.status(404)
            res.json({
                error: 'repository not loaded'
            })
            return
        }

        res.json(data)
    })
})

router.delete('/:repositoryId', (req, res) => {
    const options = {
        cwd: pathToReps,
        repositoryId: req.params.repositoryId.replace(/^\//, '')
    }
    deleteRepository(options, (err, file) => {
        if(err) {
            res.status(404)
            res.json({
                error: 'repository not deleted'
            })
            return
        }

        res.json(file)
    })
})

router.get(/.*/, (req, res) => {
    res.status(404)
    res.json({
        error: 'resource not found'
    })
})


module.exports = router