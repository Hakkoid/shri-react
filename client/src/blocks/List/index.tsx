import React from 'react'

import './index.scss'
import Item from './Item'

import { cn } from '@bem-react/classname'
export const bemCls = cn('List')

interface ListProps {
    className?: string,
    children?: JSX.Element[] | JSX.Element
}

const List = ({ children, className }: ListProps): JSX.Element => {
    let cls = bemCls()
    cls += className ? ` ${className}` : ''

    return <ul className={cls}>{children}</ul>
}

List.Item = Item

export default List