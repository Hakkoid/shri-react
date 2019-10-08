import React from 'react'

import './index.scss'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Icon')

const ICONS = {
    'dir': 'directory',
    'file': 'file',
    'script': 'script'
}

export default ({ type, mods }) => {
    return (
        <svg class={bemCls(mods)}>
            <use href={`./icons.svg#${ICONS[type]}`} />
        </svg>
    )
}