import React from 'react'
import { bemCls as bemText } from '../Text'

import './index.scss'
import Field from './Field'
import Text from './Text'
import { ModProps } from '../../types'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Line')

interface LineProps extends ModProps {
    children?: JSX.Element | JSX.Element[]
    className?: string
}

const Line = ({ mods, children, className}: LineProps) => {
    let cls = bemCls(mods)
    cls += ` ${bemText({size: 'm', spacing: 'l'})}`
    cls += className ? ` ${className}` : ''

    return (
        <ul className={cls}>
            {children}
        </ul>
    )
}

Line.Field = Field
Line.Text = Text

export default Line