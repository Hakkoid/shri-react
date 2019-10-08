import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import List from './../List'
import StyledLink from './../StyledLink'
import { fetchRepositories } from './../../actions/repositories'


const Repositories = ({ repositories = [], onInit }) => {
    useEffect(onInit, [])

    return (
        <List>
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

const mapStateToProps = ({ repositories }) => { return { repositories } }
const mapDispatchToProps = dispatch => {
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