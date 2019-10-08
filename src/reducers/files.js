import { ADD_FILE, ADD_FILES, RESET_FILES } from './../constants/ActionTypes'

const files = (state = [], action) => {
    switch (action.type) {
        case ADD_FILE:
            return [ 
                ...state, 
                action.data
            ]

        case ADD_FILES:
            return [
                ...state,
                ...action.files
            ]

        case RESET_FILES: 
            return [  
                ...action.files
            ]

        default:
            return state
    }
}

export default files