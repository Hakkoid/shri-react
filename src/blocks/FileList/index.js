import React, { useEffect } from 'react';
import { connect } from 'react-redux'

import Line from './../Line'
import List from './../List'
import StyledLink from './../StyledLink'
import { bemCls as bemText } from './../Text'
import { fetchFiles } from './../../actions/files'

const FileList = ({ files = [], params, onInit }) => {
    const {
        repositoryId,
        commitHash,
        path
    } = params

    useEffect(() => {
        onInit(repositoryId, commitHash, path)
    }, [
        onInit,
        repositoryId,
        commitHash,
        path
    ])

    const lines = makeLines(files, repositoryId, commitHash)


    return (
        <List>
            <List.Item mods={{ view: 'header' }}>
                <Line className={bemText({ color: 'secondary' })}>
                    <Line.Field mods={{ grow: 'medium' }}>Name</Line.Field>
                    <Line.Field mods={{ grow: 'medium' }}>Commit hash</Line.Field>
                    <Line.Field mods={{ grow: 'long' }}>Message</Line.Field>
                    <Line.Field mods={{ grow: 'default' }}>Committer</Line.Field>
                    <Line.Field mods={{ grow: 'default' }}>Updated</Line.Field>
                </Line>
            </List.Item>
            {lines}
        </List>
    )
}

function makeLines(files, repos, currentHash) {
    let path = './'

    if(!currentHash){
        path += 'master'
    }

    return files.map(file => {
        const {
            fileName,
            commitHash,
            message,
            committer,
            updated
        } = file

        return (
            <List.Item key={fileName}>
                <Line>
                    <Line.Field mods={{ grow: 'medium' }}>
                        <StyledLink color='main' className={bemText({ weight: 'bold' })} to={`${path}/${fileName}`}>
                            {fileName}
                        </StyledLink>
                    </Line.Field>
                    <Line.Field mods={{ grow: 'medium' }}>
                        <StyledLink to={`/repos/${repos}/tree/${commitHash}`}>
                            {commitHash.slice(0, 6)}
                        </StyledLink>
                    </Line.Field>
                    <Line.Field mods={{ grow: 'long' }}>{message}</Line.Field>
                    <Line.Field className={bemText({ firstLetter: 'active' })} mods={{ grow: 'default' }}>
                        {committer}
                    </Line.Field>
                    <Line.Field mods={{ grow: 'default' }}>{updated}</Line.Field>
                </Line>
            </List.Item>
        )
    })

}

const mapStateToProps = ({ files }) => { return { files } }
const mapDispatchToProps = dispatch => {
    return {
        onInit: (repositoryId, commitHash, path) => {
            dispatch(fetchFiles(repositoryId, commitHash, path))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileList)