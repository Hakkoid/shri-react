import {
    SET_FILE_BLOB,
    SetFileBlobAction,
    FETCH_FILE_BLOB,
    FetchFileBlobAction
} from './types'

export const setFileBlob = (data: string ): SetFileBlobAction => ({
    type: SET_FILE_BLOB,
    data
})

interface FetchFileBlob {
    (repositoryId: string, commitHash: string, path: string): FetchFileBlobAction
}

export const fetchFileBlob: FetchFileBlob = (repositoryId, commitHash, path) => ({
    type: FETCH_FILE_BLOB,
    repositoryId,
    commitHash,
    path
})