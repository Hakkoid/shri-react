import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import Layout from '../../blocks/Layout'
import Branch from '../../blocks/Branch'
import Hr from '../../blocks/Hr'
import Navigation from '../../blocks/Navigation'
import Code from '../../blocks/Code'
import Path from '../../blocks/Path'
import { fetchFileBlob } from '../../redux/file-blob/actions'
import { FileBlob } from '../../redux/file-blob/index'
import { RouteComponentProps } from 'react-router';

const Nav = (): JSX.Element => {
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

interface InitProps {
    onInit: (
        repositoryId: string,
        commitHash: string,
        path: string
    ) => void
}

interface BlobProps {
    blob: string
}

type Params = {
    repositoryId: string,
    commitHash: string,
    path: string
}

type FileProps = InitProps & BlobProps & RouteComponentProps<Params>

const File = ({ match, onInit, blob }: FileProps): JSX.Element => {
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

const mapStateToProps = (state: { fileBlob: FileBlob }): BlobProps => {
    return {
        blob: state.fileBlob.data
    }
}
const mapDispatchToProps = (dispatch: Dispatch): InitProps => {
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