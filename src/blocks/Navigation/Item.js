import React from  'react'
import './index.scss'
import { bemCls } from './index'

export default ({ children, mods }) => {
    return (
        <li className={bemCls('Item', mods)}>
            <span className={bemCls('Underline')} />
            {children}
        </li>
    )
}