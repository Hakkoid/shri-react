export const ADD_REPOSITORY = 'ADD_REPOSITORY'
export const ADD_REPOSITORIES = 'ADD_REPOSITORIES'
export const RESET_REPOSITORIES = 'RESET_REPOSITORIES'

export const FETCH_REPOSITORIES = 'FETCH_REPOSITORIES'

export interface AddRepAction {
    type: "ADD_REPOSITORY",
    data: string
}

export interface AddRepsAction {
    type: "ADD_REPOSITORIES",
    repositories: Array<string>
}

export interface ResetRepsAction {
    type: "RESET_REPOSITORIES",
    repositories?: Array<string>
}

export type RepsActions = AddRepAction | AddRepsAction | ResetRepsAction

export interface FetchRepsAction {
    type: "FETCH_REPOSITORIES",
}