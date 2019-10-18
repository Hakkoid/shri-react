import fs from 'fs'
import { spawn, ChildProcess } from 'child_process'

import parsePretty, { PrettyObj } from './helpers/parsePretty'

import checkHash from './helpers/checkHash'

const {
    wrapField,
    separator
} = parsePretty


interface GetReps {
    (
        path: string,
        callback: (
            err: Error | null,
            repositories?: string[]
        ) => void
    ): void
}

export const getReps: GetReps = function (path, callback) {
    callback = callback || typeof path === 'function' && path || function () { }
    path = typeof path === 'string' && path || '/'

    fs.readdir(path, { withFileTypes: true }, (err, files) => {
        if (err) {
            console.log(err)
            callback(err)
            return
        }

        const filteredFiles = files.filter(file => file.isDirectory() && file.name[0] !== '.')
        const result = filteredFiles.map(file => file.name)
        callback(err, result)
    })
}

const defaultCommitFields = [
    {
        key: 'hash',
        value: '%H'
    },
    {
        key: 'date',
        value: '%cd'
    },
    {
        key: 'message',
        value: '%s'
    },
    {
        key: 'committer',
        value: '%cn'
    },
    {
        key: 'committerEmail',
        value: '%ce'
    }
]

interface GetCommits {
    (
        options: {
            hash: string,
            fields?: Array<{
                key: string,
                value: string
            }>,
            skip?: string,
            number?: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: Array<PrettyObj | null>
        ) => void
    ): void
}

export const getCommits: GetCommits = function getCommits(options, callback) {
    const hash = options.hash.trim()

    if (!checkHash(hash)) return handleErrHash(hash, callback)

    const fields = options.fields || defaultCommitFields

    let format = ''

    fields.forEach(({ key, value }) => format += wrapField(key, value))
    format += separator

    const args: Array<string> = ['log', `${hash}`, `--pretty=format:'${format}'`]

    if (typeof options.skip === 'string') {
        args.push('--skip')
        args.push(options.skip)
    }

    if (typeof options.number === 'string') {
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
            callback(new Error('git log error: commits with these parameters don\'t exist'))
            return
        }

        callback(null, parsePretty(output))
    })
}

interface GetDiff {
    (
        options: {
            hash: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: string
        ) => void
    ): void
}

export const getDiff: GetDiff = function (options, callback) {
    const hash = options.hash

    if (!checkHash(hash)) return handleErrHash(hash, callback)

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

        callback(null, output)
    })
}

interface LsTree {
    (
        options: {
            hash?: string,
            path?: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: File[]
        ) => void
    ): void
}


export interface File {
    fileName: string,
    type: string,
    commitHash?: string,
    message?: string,
    committer?: string,
    updated?: string
}

export const lsTree: LsTree = function (options, callback) {
    const hash = options.hash || 'master'
    const path = options.path || ''

    if (!checkHash(hash)) return handleErrHash(hash, callback)

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
        let files: File[] = lines.map(line => {
            const values = line.replace(/\t/, ' ').split(' ')

            return {
                type: values[1],
                fileName: values[3]
            }
        })

        let counter = 0
        files.forEach((file, index) => {
            let pathToDir = path ? `${path}/` : ''

            getDataOfFile({
                path: `${pathToDir}${file.fileName}`,
                hash,
                cwd: options.cwd
            }, (err, data) => {
                counter++

                if (!err && data) {
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
    {
        key: 'commitHash',
        value: '%H'
    },
    {
        key: 'updated',
        value: '%cd'
    },
    {
        key: 'message',
        value: '%s'
    },
    {
        key: 'committer',
        value: '%cn'
    }
]

interface GetDataOfFile {
    (
        options: {
            hash: string,
            fields?: Array<{
                key: string,
                value: string
            }>,
            path: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: Array<PrettyObj | null>
        ) => void
    ): void
}

export const getDataOfFile: GetDataOfFile = function (options, callback) {
    const hash = options.hash
    const path = options.path

    const fields = options.fields || defaultFileFields

    let format = ''

    fields.forEach(({ key, value }) => format += wrapField(key, value))
    format += separator

    if (!checkHash(hash)) return handleErrHash(hash, callback)

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
        callback(null, parsePretty(output))
    })
}

interface Show {
    (
        options: {
            hash: string,
            path: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: string
        ) => void
    ): void
}

export const show: Show = function (options, callback) {
    const hash = options.hash
    const path = options.path

    if (!checkHash(hash)) return handleErrHash(hash, callback)

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

        callback(null, output)
    })
}

interface Clone {
    (
        options: {
            path: string,
            cwd: string
        },
        callback: (
            err: Error | null,
            result?: string
        ) => void
    ): void
}

export const clone: Clone = function (options, callback) {
    const path = options.path

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

        callback(null, 'repository is loaded success')
    })
}

interface DeleteRepository {
    (
        options: {
            cwd: string,
            repositoryId: string
        },
        callback: (
            err: Error | null,
            result?: string
        ) => void
    ): void
}

export const deleteRepository: DeleteRepository = function (options, callback) {
    const repositoryId = options.repositoryId

    const deleteProcess = spawn('rm', ['-rf', repositoryId], { cwd: options.cwd })

    let output = ''

    deleteProcess.stdout.on('data', data => {
        output += data
    })

    setSpanwErrorHandler(deleteProcess, callback)

    deleteProcess.stdout.on('end', () => {
        if (!output) return

        callback(null, 'repository is deleted success')
    })
}

interface HandleErrHash {
    (
        hash: string,
        callback: (err: Error) => void
    ): void
}

const handleErrHash: HandleErrHash = function (hash, callback) {
    const err = new Error(`Unexpected hash option ${hash}`)
    console.error(err)
    callback(err)
}

interface SetSpanwErrorHandler {
    (
        process: ChildProcess,
        callback: (err: Error) => void
    ): void
}

const setSpanwErrorHandler: SetSpanwErrorHandler = function (process, callback) {
    process.on('error', err => {
        console.error(`git spawn error: ${err}`)
        callback(err)
    })
}