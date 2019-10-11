import {
    SET_FILE_BLOB,
    FETCH_FILE_BLOB
} from './../constants/ActionTypes'

export const setFileBlob = data => ({
    type: SET_FILE_BLOB,
    data
})

export const fetchFileBlob = (repository, commitHash, path) => ({
    type: FETCH_FILE_BLOB,
    repository,
    commitHash,
    path
})