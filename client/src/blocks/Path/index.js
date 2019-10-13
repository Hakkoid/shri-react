import React from 'react'

import './index.scss'

import StyledLink from './../StyledLink'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Path')

export default ({
    mods = {},
    repositoryId,
    path = '',
    hash = 'master',
    isDirectory
}) => {
    let items = []

    if (path) items = path.replace(/(^\/)|(\/$)/g, '').split('/')

    items.unshift(hash)

    let pathTo = ``

    items = items.map((item, index) => {
        const className = bemCls('Item')
        let color = 'secondary'
        let mainPath = `repos/${repositoryId}/tree`
        pathTo += `/${item}`

        if (index === items.length - 1) {
            if (!isDirectory) mainPath = `repos/${repositoryId}/blob`
            color = 'main'
        }

        return (
            <StyledLink
                key={item}
                to={`/${mainPath}${pathTo}`}
                color={color}
                className={className}
            >
                {item}
            </StyledLink>
        )

    })


    return (
        <div className={bemCls(mods)}>{items}</div>
    )
}