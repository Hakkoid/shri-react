import { take, put, call } from 'redux-saga/effects'
import { FETCH_FILE_BLOB , FetchFileBlobAction} from './types'
import { setFileBlob } from './actions'

interface FetchFileBlobApi {
    (repositoryId: string, hash: string, path: string): Promise<string>
}

const fetchFileBlobApi: FetchFileBlobApi = (repositoryId, hash, path) => {
    let url = `/api/repos/${repositoryId}/`

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
            const { 
                repositoryId,
                commitHash,
                path 
            }: FetchFileBlobAction = yield take(FETCH_FILE_BLOB)

            const data: { data: string } = yield call(fetchFileBlobApi, repositoryId, commitHash, path)

            yield put(setFileBlob(data.data))
        } catch (e) {

        }
    }
}
