import React from 'react'

import './index.scss'
import { bemCls } from './index'

export default ({ children, mods, className = '' }) => {
    let cls = bemCls('Field', mods)
    cls += ` ${className}`

    return <li className={cls}>{children}</li>
}