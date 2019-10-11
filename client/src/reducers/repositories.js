import { ADD_REPOSITORY, ADD_REPOSITORIES, RESET_REPOSITORIES } from './../constants/ActionTypes'

const repositories = (state = [], action) => {
    switch (action.type) {
        case ADD_REPOSITORY:
            return [ 
                ...state, 
                action.data
            ]

        case ADD_REPOSITORIES:
            return [
                ...state,
                ...action.repositories
            ]

        case RESET_REPOSITORIES: 
            return [  
                ...action.repositories
            ]

        default:
            return state
    }
}

export default repositories