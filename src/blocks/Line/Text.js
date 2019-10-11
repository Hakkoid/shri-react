import React from 'react'

import './index.scss'
import { bemCls } from './index'

export default ({ children, mods, className }) => {
    let cls = bemCls('Text', mods)
    cls += className ? ` ${className}` : ''

    return <span className={cls}>{children}</span>
}