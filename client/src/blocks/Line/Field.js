import React from 'react'

import './index.scss'
import Line, { bemCls } from './index'

export default ({ children, mods, className }) => {
    let cls = bemCls('Field', mods)
    cls +=  className ? ` ${className}` : ''

    return (
        <li className={cls}>
            <Line.Text>
                {children}
            </Line.Text>
        </li>
    )
}