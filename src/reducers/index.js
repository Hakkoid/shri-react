import { combineReducers } from 'redux'
import files from './files'
import repositories from './repositories'

export default combineReducers({
    files,
    repositories
})