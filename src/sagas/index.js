import { take, put, call, fork } from 'redux-saga/effects'
import { FETCH_REPOSITORIES, FETCH_FILES } from './../constants/ActionTypes'
import { resetRepositories } from './../actions/repositories'
import { resetFiles } from './../actions/files'

const fetchReps = () => {
    return fetch('/api/repos')
        .then(e => e.json())
}

export function* fetchRepositories() {
    while (true) {
        yield take(FETCH_REPOSITORIES)
        const repositories = yield call(fetchReps)
        yield put(resetRepositories(repositories))
    }
}

const fetchFilesApi = (repository, hash, path) => {
    let url = `/api/repos/${repository}/`

    if(hash){
        url += `tree/${hash}/`
        if(path) url += path
    }

    return fetch(url)
        .then(e => {
            if(e.status === 200){ 
                return e.json()
            } else{
                throw(new Error('Data don\'t found'))
            }
        })
}

export function* fetchFiles() {
    while (true) {
        try {
            const { repository, commitHash, path } = yield take(FETCH_FILES)
            yield put(resetFiles([]))
            const repositories = yield call(fetchFilesApi, repository, commitHash, path)
            yield put(resetFiles(repositories))
        }catch(e){
            
        }
    }
}


export function* rootSaga(){
    yield fork(fetchRepositories)
    yield fork(fetchFiles)
}