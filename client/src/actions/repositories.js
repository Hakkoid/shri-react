import {
    ADD_REPOSITORY,
    ADD_REPOSITORIES,
    RESET_REPOSITORIES,
    FETCH_REPOSITORIES
} from './../constants/ActionTypes'

export const addRepository = data => ({
    type: ADD_REPOSITORY,
    data
})

export const addRepositories = repositories => ({
    type: ADD_REPOSITORIES,
    repositories
})

export const resetRepositories = repositories => ({
    type: RESET_REPOSITORIES,
    repositories
})

export const fetchRepositories = () => ({
    type: FETCH_REPOSITORIES
})