import React from 'react'

import './index.scss'
import { bemCls } from './index'
import { ModProps } from '../../types'

interface TextProps extends ModProps {
    children?: JSX.Element | JSX.Element[] | string,
    className?: string
}

const Text = ({ children, mods, className }: TextProps): JSX.Element => {
    let cls = bemCls('Text', mods)
    cls += className ? ` ${className}` : ''

    return <span className={cls}>{children}</span>
}

export default Text