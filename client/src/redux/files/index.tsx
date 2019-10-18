import { 
    ADD_FILE,
    ADD_FILES,
    RESET_FILES,
    File,
    FilesActions
} from './types'

const files = (state: Array<File> = [], action: FilesActions): Array<File> => {
    switch (action.type) {
        case ADD_FILE:
            return [ 
                ...state, 
                action.data
            ]

        case ADD_FILES:
            return [
                ...state,
                ...action.data
            ]

        case RESET_FILES: 
            return []

        default:
            return state
    }
}

export default files