import { take, takeLeading, put, call, fork } from 'redux-saga/effects'
import { FETCH_REPOSITORIES, FETCH_FILES, FETCH_FILE_BLOB } from './../constants/ActionTypes'
import { resetRepositories } from './../actions/repositories'
import { resetFiles, addFiles } from './../actions/files'
import { setFileBlob } from './../actions/file'

function* fetchReps() {
    const repositories = yield call(() => {
        return fetch('/api/repos')
            .then(e => e.json())
    })
    yield put(resetRepositories(repositories))
}

export function* fetchRepositories() {
    yield takeLeading(FETCH_REPOSITORIES, fetchReps)
}

const fetchFilesApi = (repository, hash, path) => {
    let url = `/api/repos/${repository}/`

    if (hash) {
        url += `tree/${hash}/`
        if (path) url += path
    }

    return fetch(url)
        .then(e => {
            if (e.status === 200) {
                return e.json()
            } else {
                throw (new Error('Data don\'t found'))
            }
        })
}

export function* fetchFiles() {
    while (true) {
        try {
            const { repository, commitHash, path } = yield take(FETCH_FILES)
            yield put(resetFiles())
            const files = yield call(fetchFilesApi, repository, commitHash, path)
            yield put(addFiles(files))
        } catch (e) {

        }
    }
}

const fetchFileBlobApi = (repository, hash, path) => {
    let url = `/api/repos/${repository}/`

    if (hash) {
        url += `blob/${hash}/`
        if (path) url += path
    }

    return fetch(url)
        .then(e => {
            if (e.status === 200) {
                return e.json()
            } else {
                throw (new Error('Data don\'t found'))
            }
        })
}

export function* fetchFileBlob() {
    while (true) {
        try {
            const { repository, commitHash, path } = yield take(FETCH_FILE_BLOB)
            const file = yield call(fetchFileBlobApi, repository, commitHash, path)
            yield put(setFileBlob(file))
        } catch (e) {

        }
    }
}


export function* rootSaga() {
    yield fork(fetchRepositories)
    yield fork(fetchFiles)
    yield fork(fetchFileBlob)
}