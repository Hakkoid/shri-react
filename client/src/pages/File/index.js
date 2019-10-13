import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import Layout from './../../blocks/Layout'
import Branch from './../../blocks/Branch'
import Hr from './../../blocks/Hr'
import Navigation from './../../blocks/Navigation'
import Code from './../../blocks/Code'
import Path from './../../blocks/Path'
import { fetchFileBlob } from '../../actions/file'

const Nav = () => {
    return (
        <Navigation>
            <Navigation.Item mods={{ selected: true }}>
                <Navigation.Link to='/'>
                    <b>FILES</b>
                </Navigation.Link>
            </Navigation.Item>
            <Navigation.Item>
                <Navigation.Link to='/'>
                    <b>BRANCHES</b>
                </Navigation.Link>
            </Navigation.Item>
        </Navigation>
    )
}

const File = ({ match, onInit, blob }) => {
    const {
        repositoryId,
        commitHash,
        path
    } = match.params

    useEffect(() => {
        onInit(repositoryId, commitHash, path)
    }, [
        onInit,
        repositoryId,
        commitHash,
        path
    ])

    const fileName = match.params.path.replace(/.*\//, '')

    return (
        <Layout.Section>
            <Path {...{ hash: commitHash, path, repositoryId }} />
            <Hr />
            <Branch />
            <Nav />
            <Code fileName={fileName} blob={blob} />
        </Layout.Section>
    )
}

const mapStateToProps = ({ file }) => { return { blob: file.data } }
const mapDispatchToProps = dispatch => {
    return {
        onInit: (repositoryId, commitHash, path) => {
            dispatch(fetchFileBlob(repositoryId, commitHash, path))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(File)