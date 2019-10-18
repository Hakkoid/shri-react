export const ADD_FILE = 'ADD_FILE'
export const ADD_FILES = 'ADD_FILES'
export const RESET_FILES = 'RESET_FILES'

export const FETCH_FILES = 'FETCH_FILES'

export interface AddFileAction {
    type: "ADD_FILE",
    data: File
}

export interface AddFilesAction {
    type: "ADD_FILES",
    data: Array<File>
}

export interface ResetFilesAction {
    type: "RESET_FILES"
}

export type FilesActions = AddFileAction | AddFilesAction | ResetFilesAction

export interface FetchFilesAction {
    type: "FETCH_FILES",
    commitHash?: string,
    repositoryId: string,
    path?: string
}

export interface File {
    fileName: string,
    commitHash: string,
    message: string,
    committer: string,
    updated: string,
    type: string
}