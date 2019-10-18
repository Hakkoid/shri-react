import React, { ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { bemCls as bemText } from '../Text'

interface StyledLink {
    to: string,
    children: ReactNode,
    color?: string,
    className?: string
}

const StyledLink = ({
    to,
    children,
    color = 'link',
    className
}: StyledLink) => {
    let cls = bemText({ color, view: 'link' })
    cls += className ? ` ${className}` : ''

    return <Link className={cls} to={to}>{children}</Link>
}

export default StyledLink
