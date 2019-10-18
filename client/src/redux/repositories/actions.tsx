import {
    ADD_REPOSITORY,
    AddRepAction,
    ADD_REPOSITORIES,
    AddRepsAction,
    RESET_REPOSITORIES,
    ResetRepsAction,
    FETCH_REPOSITORIES,
    FetchRepsAction
} from './types'


export const addRepository = (data: string): AddRepAction => ({
    type: ADD_REPOSITORY,
    data
})

export const addRepositories = (repositories: Array<string>): AddRepsAction => ({
    type: ADD_REPOSITORIES,
    repositories
})

export const resetRepositories = (): ResetRepsAction => ({
    type: RESET_REPOSITORIES
})

export const fetchRepositories = (): FetchRepsAction => ({
    type: FETCH_REPOSITORIES
})