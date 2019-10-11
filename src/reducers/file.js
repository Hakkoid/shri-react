import { SET_FILE_BLOB } from './../constants/ActionTypes'

const file = (state = {}, action) => {
    switch (action.type) {
        case SET_FILE_BLOB:
            return {
                ...action.data
            }

        default:
            return state
    }
}

export default file