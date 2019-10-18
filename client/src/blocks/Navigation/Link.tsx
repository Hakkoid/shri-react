import React from  'react'
import { Link as RouterLink } from 'react-router-dom'

import { bemCls as bemText } from '../Text'

import './index.scss'
import { bemCls } from './index'

interface LinkProps {
    children: JSX.Element | JSX.Element[] | string,
    to: string
}

const Link = ({ children, to }: LinkProps) => {
    let className = bemCls('Link')
    className += ` ${bemText({size: 'l', spacing: 'xs', view: 'link'})}`

    return <RouterLink className={className} to={to}>{children}</RouterLink>
}

export default Link