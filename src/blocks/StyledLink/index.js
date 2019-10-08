import React from 'react'
import { Link } from 'react-router-dom'

import { bemCls as bemText } from './../Text'

export default ({ to, children, color, className = '' }) => {
    const colorText = color || 'link'

    let cls = bemText({ color: colorText, view: 'link' })
    cls += ` ${className}`

    return <Link className={cls} to={to}>{children}</Link>
}
