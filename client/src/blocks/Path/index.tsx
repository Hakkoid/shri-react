import React from 'react'

import './index.scss'

import StyledLink from '../StyledLink'

import { cn } from '@bem-react/classname'
import { ModProps } from '../../types'

export const bemCls = cn('Path')

interface PathProps extends ModProps {
    repositoryId: string,
    path?: string,
    hash?: string,
    isDirectory?: boolean
}

const Path = ({
    mods,
    repositoryId,
    path = '',
    hash = 'master',
    isDirectory
}: PathProps): JSX.Element => {
    let items: string[] = []

    if (path) items = path.replace(/(^\/)|(\/$)/g, '').split('/')

    items.unshift(hash)

    let pathTo: string = ``

    const links = items.map((item, index): JSX.Element => {
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
        <div className={bemCls(mods)}>{links}</div>
    )
}

export default Path