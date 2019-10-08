import React from 'react'
import { bemCls as bemText } from './../Text'

import './index.scss'
import Field from './Field'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Line')

const Line = ({ mods, children, className = ''}) => {
    let cls = bemCls(mods)
    cls += ` ${bemText({size: 'm', spacing: 'l'})}`
    cls += ` ${className}`

    return (
        <ul className={cls}>
            {children}
        </ul>
    )
}

Line.Field = Field

export default Line