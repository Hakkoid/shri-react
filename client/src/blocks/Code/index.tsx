import React from 'react';
import './index.scss'

import { bemCls as bemHighlighter } from '../Highlighter'
import { bemCls as bemText } from '../Text'
import FileIcon from '../FileIcon'

import Line from './Line'

import { cn } from '@bem-react/classname'
import { ModProps } from '../../types';
export const bemCls = cn('Code')

interface CodeProps extends ModProps {
    fileName?: string,
    blob?: string,
    className?: string
}

const Code = ({ fileName = '', blob = '', mods, className }: CodeProps): JSX.Element => {
    let cls = bemCls(mods)
    cls += className ? ` ${className}` : ''


    if (fileName.search(/\./)) {
        const extension = fileName.replace(/.*\./, '')
        cls += ` ${bemHighlighter({ lang: extension })}`
    }

    return (
        <div className={cls}>
            <div className={`${bemCls('Header')} ${bemText({ size: 'm' })}`}>
                <FileIcon fileName={fileName} className={bemCls('FileIcon')} />
                {fileName}
                <a href="/" className={bemCls('Download')}>
                    <svg viewBox="0 0 13.5 12" height="14" width="13.5">
                        <use href="/icons.svg#download" />
                    </svg>
                </a>
            </div>
            <table className={`${bemCls('Blob')} ${bemHighlighter('El', { color: 'default' })}`}>
                <tbody>
                    {renderBlob(blob)}
                </tbody>
            </table>
        </div>
    )
}


function renderBlob(blob: string): JSX.Element[] {
    const lines = blob.split(/\n/)
    return lines.map((text, index) => <Line key={index}>{text}</Line>)
}

Code.Line = Line

export default Code