import React from  'react'
import './index.scss'
import { bemCls } from './index'
import { ModProps } from '../../types'

interface ItemProps extends ModProps {
    children: JSX.Element | JSX.Element[] | string
}
const Item = ({ children, mods }: ItemProps): JSX.Element => {
    return <li className={bemCls('Item', mods)}>{children}</li>
}

export default Item