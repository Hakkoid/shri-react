import { Action } from 'redux'

export const SET_FILE_BLOB = 'SET_FILE_BLOB'
export const RESET_FILE_BLOB = 'RESET_FILE_BLOB'
export const FETCH_FILE_BLOB = 'FETCH_FILE_BLOB'

export interface SetFileBlobAction extends Action {
    type: "SET_FILE_BLOB",
    data: string
}

export interface ResetFileBlobAction extends Action {
    type: "RESET_FILE_BLOB"
}

export interface FetchFileBlobAction extends Action {
    type: "FETCH_FILE_BLOB",
    commitHash: string,
    repositoryId: string,
    path: string
}

export type FileBlobTypes = SetFileBlobAction | ResetFileBlobAction