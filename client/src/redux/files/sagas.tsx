import { take, put, call } from 'redux-saga/effects'
import { resetFiles, addFiles } from './actions'
import { FETCH_FILES, File, FetchFilesAction } from './types'

interface FetchFilesApi{
    (repositoryId: string, hash?: string, path?: string): Promise<File[]>
}

const fetchFilesApi: FetchFilesApi = (repositoryId, hash, path) => {
    let url = `/api/repos/${repositoryId}/`

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
            const { 
                repositoryId,
                commitHash,
                path 
            }: FetchFilesAction = yield take(FETCH_FILES)
            yield put(resetFiles())
            const files: Array<File> = yield call(fetchFilesApi, repositoryId, commitHash, path)
            yield put(addFiles(files))
        } catch (e) {

        }
    }
}