import React from 'react'

import './index.scss'
import Item from './Item'

import { cn } from '@bem-react/classname'
export const bemCls = cn('List')

const List = ({ children }) => <ul className="List">{children}</ul>

List.Item = Item

export default List