import React from 'react'

import './index.scss'
import Item from './Item'
import Link from './Link'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Navigation')

const Navigation = ({ children, mods = {} }) => <ul className={bemCls(mods)} >{children}</ul>

Navigation.Item = Item
Navigation.Link = Link

export default Navigation