const fs = require('fs')
const { spawn } = require('child_process')

const wrap = text => `--{{{${text}}}}--`
const separator = '>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>'

exports.getReps = function getReps(path, callback) {
    callback = callback || typeof path === 'function' && path || function () { }
    path = typeof path === 'string' && path || '/'

    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err)
            callback(err)
            return
        }

        let result = files.filter(file => file.isDirectory() && file.name[0] !== '.')
        result = result.map(file => file.name)
        callback(err, result)
    })
}

const defaultCommitFields = [
    'hash: %H',
    'date: %cd',
    'message: %s',
    'committer: %cn',
    'committerEmail: %ce'
]

exports.getCommits = function getCommits(options, callback) {
    const hash = options.hash.trim()

    if (checkHash(hash)) return handleErrHash(hash, callback)

    const fields = options.fields || defaultCommitFields

    let format = ''

    fields.forEach(field => format += wrap(field))
    format += separator

    const args = ['log', `${hash}`, `--pretty=format:'${format}'`]

    if (typeof options.skip === 'number') {
        args.push('--skip')
        args.push(options.skip)
    }

    if (typeof options.number === 'number') {
        args.push('-n')
        args.push(options.number)
    }

    const logProcess = spawn('git', args, { cwd: options.cwd })

    let output = ''

    logProcess.stdout.on('data', data => output += data)

    setSpanwErrorHandler(logProcess, callback)

    logProcess.stderr.on('data', data => {
        console.error(`git log error: ${data}`)
        callback(data)
    })

    logProcess.stdout.on('end', () => {
        if (!output) {
            callback('git log error: commits with these parameters don\'t exist')
            return
        }

        callback(null, renderPretty(output))
    })
}

exports.getDiff = function getDiff(options, callback) {
    const hash = options.hash

    if (checkHash(hash)) return handleErrHash(hash, callback)

    const diffProcess = spawn('git', ['diff', `${hash}^1..${hash}`], { cwd: options.cwd })

    let output = ''

    diffProcess.stdout.on('data', data => output += data)

    setSpanwErrorHandler(diffProcess, callback)

    diffProcess.stderr.on('data', data => {
        console.error(`git diff error: ${data}`)
        callback(data)
    })

    diffProcess.stdout.on('end', () => {
        if (!output) return

        const result = {
            diff: output
        }

        callback(null, result)
    })
}

exports.lsTree = function lsTree(options, callback) {
    const hash = options.hash || 'master'
    const path = options.path || ''

    if (checkHash(hash)) return handleErrHash(hash, callback)

    const lsProcess = spawn('git', ['ls-tree', `${hash}:${path}`], { cwd: options.cwd })

    let output = ''

    lsProcess.stdout.on('data', data => output += data)

    setSpanwErrorHandler(lsProcess, callback)

    lsProcess.stderr.on('data', data => {
        console.error(`git ls-tree error: ${data}`)
        callback(data)
    })

    lsProcess.stdout.on('end', () => {
        if (!output) return

        let lines = output.replace(/\n$/, '').split(/\n/)
        let files = lines.map(line => {
            const values = line.replace(/\t/, ' ').split(' ')

            return {
                type: values[1],
                fileName: values[3]
            }
        })

        let counter = 0
        files = files.map((file, index) => {
            let pathToDir = path ? `${path}/` : ''

            getDataOfFile({
                path: `${pathToDir}${file.fileName}`,
                hash,
                cwd: options.cwd
            }, (err, data = {}) => {
                counter++

                if (!err) {
                    files[index] = {
                        ...file,
                        ...data[0]
                    }
                }

                if (counter === files.length) {
                    callback(null, files)
                }
            })
        })
    })
}

const defaultFileFields = [
    'commitHash: %H',
    'updated: %cd',
    'message: %s',
    'committer: %cn',
]

function getDataOfFile(options, callback) {
    const hash = options.hash
    const path = options.path

    const fields = options.fields || defaultFileFields

    let format = ''

    fields.forEach(field => format += wrap(field))
    format += separator

    if (!path) {
        const err = `path option is required`
        console.error(err)
        callback(err)
        return
    }

    if (checkHash(hash)) return handleErrHash(hash, callback)

    const showProcess = spawn('git', ['log', '-n', '1', `--format='${format}'`, hash, '--', `./${path}`], { cwd: options.cwd })

    let output = ''

    showProcess.stdout.on('data', data => output += data)

    setSpanwErrorHandler(showProcess, callback)

    showProcess.stderr.on('data', data => {
        console.error(`git log error: ${data}`)
        callback(data)
    })

    showProcess.stdout.on('end', () => {
        if (!output) return
        callback(null, renderPretty(output))
    })
}


exports.show = function show(options, callback) {
    const hash = options.hash
    const path = options.path

    if (!path) {
        const err = `path option is required`
        console.error(err)
        callback(err)
        return
    }

    if (checkHash(hash)) return handleErrHash(hash, callback)

    const showProcess = spawn('git', ['show', `${hash}:${path}`], { cwd: options.cwd })

    let output = ''

    showProcess.stdout.on('data', data => output += data)

    setSpanwErrorHandler(showProcess, callback)

    showProcess.stderr.on('data', data => {
        console.error(`git ls-tree error: ${data}`)
        callback(data)
    })

    showProcess.stdout.on('end', () => {
        if (!output) return

        const result = {
            data: output
        }
        callback(null, result)
    })
}

exports.clone = function (options, callback) {
    const path = options.path

    if (!path) {
        const err = `path option is required`
        console.error(err)
        callback(err)
        return
    }
    const cloneProcess = spawn('git', [
        'clone', `${path}`
    ], {
        cwd: options.cwd
    })

    let output = ''

    cloneProcess.stdout.on('data', data => {
        output += data
    })

    setSpanwErrorHandler(cloneProcess, callback)

    cloneProcess.stdout.on('end', () => {
        if (!output) return

        const result = {
            message: 'repository is loaded success'
        }
        callback(null, result)
    })
}

exports.deleteRepository = function deleteRepository(options, callback) {
    const repositoryId = options.repositoryId

    if (!repositoryId) {
        const err = `repositoryId option is required`
        console.error(err)
        callback(err)
        return
    }
    const deleteProcess = spawn('rm', ['-rf', repositoryId], { cwd: options.cwd })

    let output = ''

    deleteProcess.stdout.on('data', data => {
        output += data
    })

    setSpanwErrorHandler(deleteProcess, callback)

    deleteProcess.stdout.on('end', () => {
        if (!output) return

        const result = {
            message: 'repository is deleted success'
        }
        callback(null, result)
    })
}

function checkHash(hash) {
    return !!hash.match(/[~. \-=(){}]/)
}

function handleErrHash(hash, callback) {
    const err = `Unexpected hash option ${hash}`
    console.error(err)
    callback(err)
}

function setSpanwErrorHandler(process, callback) {
    process.on('error', err => {
        console.error(`git spawn error: ${err}`)
        callback(err)
    })
}

function renderPretty(output) {
    let data = output.split(separator)
    data.pop()


    return data.map(item => {
        const variables = item.match(/\-{2}\{{3}.*?\}{3}\-{2}/g)
        const result = {}
        variables.forEach(variable => {
            variable = variable.slice(5, variable.length - 5)
            const key = variable.match(/[^:]*:/)[0].replace(':', '')
            const value = variable.replace(/[^:]*:/, '').trim()

            result[key] = value
        })
        return result
    })
}