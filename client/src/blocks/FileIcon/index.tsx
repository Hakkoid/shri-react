import React from 'react'

import './index.scss'

import { cn } from '@bem-react/classname'
import { ModProps } from '../../types'
export const bemCls = cn('FileIcon')


const FILE_TYPES = [
    {
        id: 'script',
        extensions: ['js', 'py', 'cpp', 'css', 'scss', 'md']
    },
    {
        id: 'file',
        extensions: ['make', 'txt'],
    }
]

interface FileIconProps extends ModProps {
    fileName: string,
    type?: string,
    className?: string
}

const FileIcon = ({ fileName, type, mods, className }: FileIconProps): JSX.Element => {
    const id = getId(fileName, type)
    let cls = bemCls(mods)
    cls += className ? ` ${className}` : ''

    return (
        <svg className={`${cls}`}>
            <use href={`/icons.svg#${id}`} />
        </svg>
    )
}

function getId(fileName: string, type?: string): string {
    if (type === 'tree') return 'directory'

    if(fileName.search(/\./)){
        const extension = fileName.replace(/.*\./, '')
        const file = FILE_TYPES.find( item => {
            return item.extensions.find( ext => ext === extension )
        })

        if(file)  return file.id
    }

    return 'file'
}

export default FileIcon