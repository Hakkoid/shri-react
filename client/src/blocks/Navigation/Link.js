import React from  'react'
import { Link } from 'react-router-dom'

import { bemCls as bemText } from './../Text'

import './index.scss'
import { bemCls } from './index'

export default ({ children, to }) => {
    let className = bemCls('Link')
    className += ` ${bemText({size: 'l', spacing: 'xs', view: 'link'})}`

    return <Link className={className} to={to}>{children}</Link>
}