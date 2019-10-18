import React from 'react'

import './index.scss'
import Item from './Item'
import Link from './Link'
import { ModProps } from './../../types'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Navigation')

interface NavigationProps extends ModProps {
    children: JSX.Element | JSX.Element[] | string,
}

const Navigation = ({ children, mods }: NavigationProps): JSX.Element=> {
    return <ul className={bemCls(mods)} >{children}</ul>
}

Navigation.Item = Item
Navigation.Link = Link

export default Navigation