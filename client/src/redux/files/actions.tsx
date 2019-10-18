import { 
  ADD_FILE,
  AddFileAction,
  ADD_FILES,
  AddFilesAction,
  RESET_FILES,
  ResetFilesAction,
  FETCH_FILES,
  FetchFilesAction,
  File
} from './types'

export const addFile = (data: File): AddFileAction => ({
  type: ADD_FILE,
  data
})

export const addFiles = (data: Array<File>): AddFilesAction => ({
    type: ADD_FILES,
    data
})

export const resetFiles = (): ResetFilesAction => ({
    type: RESET_FILES
})

interface FetchFiles {
  (repositoryId: string, commitHash?: string, path?: string): FetchFilesAction
}

export const fetchFiles: FetchFiles = (repositoryId, commitHash, path) => ({
  type: FETCH_FILES,
  repositoryId,
  commitHash,
  path
})