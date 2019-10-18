import { takeLeading, put, call } from 'redux-saga/effects'
import { FETCH_REPOSITORIES } from './types'
import { resetRepositories, addRepositories } from './actions'

function* fetchApiReps() {
    yield put(resetRepositories())
    const repositories: Array<string> = yield call(() => {
        return fetch('/api/repos')
            .then(e => e.json())
    })
    yield put(addRepositories(repositories))
}

export function* fetchRepositories() {
    yield takeLeading(FETCH_REPOSITORIES, fetchApiReps)
}