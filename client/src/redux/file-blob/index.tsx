import { SET_FILE_BLOB, RESET_FILE_BLOB, FileBlobTypes } from './types'

export interface FileBlob {
    data: string
}

const fileBlob = (state: FileBlob = { data: '' } , action: FileBlobTypes): FileBlob => {
    switch (action.type) {
        case SET_FILE_BLOB:
            return {
                    data: action.data
                }

        case RESET_FILE_BLOB:
                return {
                    data: ''
                }
    
        default:
            return state
    }
}

export default fileBlob