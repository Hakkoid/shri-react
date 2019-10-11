import React from 'react'

import './index.scss'

import { cn } from '@bem-react/classname'
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

export default ({ fileName, type, mods, className }) => {
    const id = getId(fileName, type)
    let cls = bemCls(mods)
    cls += className ? ` ${className}` : ''

    return (
        <svg className={`${cls}`}>
            <use href={`/icons.svg#${id}`} />
        </svg>
    )
}

function getId(fileName, type) {
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