import { 
    ADD_REPOSITORY,
    ADD_REPOSITORIES,
    RESET_REPOSITORIES,
    RepsActions
} from './types'

const repositories = (state: Array<string> = [], action: RepsActions): Array<string> => {
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
            return []

        default:
            return state
    }
}

export default repositories