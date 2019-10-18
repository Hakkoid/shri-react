import { combineReducers } from 'redux'
import { fork } from 'redux-saga/effects'

import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'

import files from './files'
import { fetchFiles } from './files/sagas'

import fileBlob from './file-blob'
import { fetchFileBlob } from './file-blob/sagas'

import repositories from './repositories'
import { fetchRepositories } from './repositories/sagas'


const rootReducer = combineReducers({
    files,
    fileBlob,
    repositories
})

export function* rootSaga() {
    yield fork(fetchRepositories)
    yield fork(fetchFiles)
    yield fork(fetchFileBlob)
}

const sagaMiddleware = createSagaMiddleware()

const store =  createStore(rootReducer, applyMiddleware(sagaMiddleware))

sagaMiddleware.run(rootSaga)

export default store