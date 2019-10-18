import React from 'react'

import './index.scss'

import { ModProps } from '../../types'
import { cn } from '@bem-react/classname'
export const bemCls = cn('Text')

interface TextProps extends ModProps {
    children?: JSX.Element | JSX.Element[] | string
}

const Text = ({ children, mods }: TextProps): JSX.Element => {
    return <span className={bemCls(mods)}>{children}</span>
}

export default Text