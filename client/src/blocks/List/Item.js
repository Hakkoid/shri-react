import React from  'react'
import './index.scss'
import { bemCls } from './index'

export default ({ children, mods }) => <li className={bemCls('Item', mods)}>{children}</li>