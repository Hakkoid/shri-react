import { 
  ADD_FILE,
  ADD_FILES,
  RESET_FILES,
  FETCH_FILES
} from './../constants/ActionTypes'

export const addFile = data => ({
  type: ADD_FILE,
  data
})

export const addFiles = files => ({
    type: ADD_FILES,
    files
})

export const resetFiles = files => ({
    type: RESET_FILES,
    files
})

export const fetchFiles = (repository, commitHash, path) => ({
  type: FETCH_FILES,
  repository,
  commitHash,
  path
})