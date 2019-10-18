import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

import List from '../List'
import StyledLink from '../StyledLink'
import { fetchRepositories } from '../../redux/repositories/actions'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Repositories')

interface StateRepositories {
    repositories: Array<string>
}

interface RepositoriesProps extends StateRepositories {
    onInit: () => void
}

const Repositories = ({ repositories = [], onInit }: RepositoriesProps) => {
    useEffect(onInit, [])

    return (
        <List className={bemCls()}>
            {
                repositories.map(repository => {
                    return (
                        <List.Item key={repository}>
                            <StyledLink color='main' to={`/repos/${repository}/tree/`}>{repository}</StyledLink>
                        </List.Item>
                    )
                })
            }
        </List>
    )
}

const mapStateToProps = ({ repositories }: StateRepositories) => { return { repositories } }
const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onInit: () => {
            dispatch(fetchRepositories())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Repositories)