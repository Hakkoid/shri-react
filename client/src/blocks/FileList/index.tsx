import React, { useEffect } from 'react';
import { connect } from 'react-redux'
import { Dispatch } from 'redux';

import Line from '../Line'
import { bemCls as bemLine } from '../Line'
import List from '../List'
import FileIcon from '../FileIcon'
import StyledLink from '../StyledLink'
import { bemCls as bemText } from '../Text'
import { fetchFiles } from '../../redux/files/actions'
import { File } from '../../redux/files/types';

import { cn } from '@bem-react/classname'
const bemCls = cn('FileList')

interface FileListProps {
    files: File[],
    params: {
        commitHash?: string,
        path?: string,
        repositoryId: string
    },
    onInit: (repositoryId: string, commitHash?: string, path?: string) => void
}

const FileList = ({ files = [], params, onInit }: FileListProps) => {
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

    const lines = makeLines({ files, repos: repositoryId, currentHash: commitHash, path })

    lines.unshift(
        <List.Item key='----header----' mods={{ view: 'header' }}>
            <Line className={bemText({ color: 'secondary' })}>
                <Line.Field mods={{ grow: 'medium' }}>Name</Line.Field>
                <Line.Field mods={{ grow: 'medium' }}>Commit hash</Line.Field>
                <Line.Field mods={{ grow: 'long' }}>Message</Line.Field>
                <Line.Field mods={{ grow: 'default' }}>Committer</Line.Field>
                <Line.Field mods={{ grow: 'default' }}>Updated</Line.Field>
            </Line>
        </List.Item>
    )

    return (
        <List className={bemCls()}>
            {lines}
        </List>
    )
}

function makeLines({ files, repos, currentHash, path }: {
    files: File[],
    repos: string,
    currentHash?: string,
    path?: string
}): JSX.Element[] {

    const sortedFiles = files.sort(file => {
        if (file.type === 'blob') return 1
        if (file.type === 'tree') return -1

        return 0
    })

    return sortedFiles.map(file => {
        const {
            fileName,
            commitHash,
            message,
            committer,
            updated,
            type
        } = file

        return (
            <List.Item key={fileName}>
                <Line>
                    <Line.Field className={bemCls('Name')} mods={{ grow: 'medium', withIcon: true }}>
                        <StyledLink
                            color='main'
                            className={bemText({ weight: 'bold' })}
                            to={makePath({ fileName, repos, type, currentHash, path })}
                        >
                            <FileIcon {...{ fileName, type, className: bemLine('Icon') }} />
                            {fileName}
                        </StyledLink>
                    </Line.Field>
                    <Line.Field className={bemCls('Hash')} mods={{ grow: 'medium' }}>
                        <StyledLink to={`/repos/${repos}/tree/${commitHash}`}>
                            {commitHash.slice(0, 6)}
                        </StyledLink>
                    </Line.Field>
                    <Line.Field mods={{ grow: 'long' }}>{message}</Line.Field>
                    <Line.Field className={bemText({ firstLetter: 'active' })} mods={{ grow: 'default' }}>
                        {committer}
                    </Line.Field>
                    <Line.Field mods={{ grow: 'default' }}>{renderDate(updated)}</Line.Field>
                </Line>
            </List.Item>
        )
    })

}

function makePath({ fileName, repos, type, currentHash, path
}: {
    fileName: string,
    repos: string,
    type?: string,
    currentHash?: string,
    path?: string
}): string {
    const main = `/repos/${repos}/`

    const typeFile = type ? renderSlash(type) : 'tree/'
    const hash = currentHash ? renderSlash(currentHash) : 'master/'
    const pathToDir = path ? renderSlash(path) : ''

    return `${main}${typeFile}${hash}${pathToDir}${fileName}`
}

function renderSlash(str: string) {
    return str.replace(/(^\/)|(\/$)/g, '') + '/'
}

function renderDate(str: string) {
    const date = new Date(str)
    return `${date.getDay()} ${date.getMonth()} ${date.getFullYear()}`
}

interface StateFiles{
    files: File[]
}

const mapStateToProps = ({ files }: StateFiles): StateFiles => { return { files } }

const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        onInit: (repositoryId: string, commitHash?: string, path?: string) => {
            dispatch(fetchFiles(repositoryId, commitHash, path))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FileList)