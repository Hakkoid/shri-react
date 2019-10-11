import { combineReducers } from 'redux'
import files from './files'
import file from './file'
import repositories from './repositories'

export default combineReducers({
    files,
    file,
    repositories
})