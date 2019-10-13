import React from 'react'

import './index.scss'
import Item from './Item'

import { cn } from '@bem-react/classname'
export const bemCls = cn('List')

const List = ({ children, className }) => {
    let cls = bemCls()
    cls += className ? ` ${className}` : ''

    return <ul className={cls}>{children}</ul>
}

List.Item = Item

export default List