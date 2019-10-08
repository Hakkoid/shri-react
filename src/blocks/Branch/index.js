import React from 'react'
import Dropdown from './../Dropdown'
import { bemCls as bemText } from './../Text'
import StyledLink from './../StyledLink'

import './index.scss'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Branch')

const Branch = ({ children }) => {
    const className = `${bemCls()} ${bemText({spacing: 'l', weight: 'medium'})}`

    const propsDropdown = { 
        mods: {color: 'secondary'}, 
        title: 'trunk'
    }

    return (
        <div className={className} >
            <h2 className={bemCls('Name')}>arcadia <Dropdown {...propsDropdown}></Dropdown></h2>
            <p className={bemText({size: 'm', type: 'p', spacing: 'xl'})}>
                Last commit <StyledLink to="/">c4d248</StyledLink> {'on '}
                <StyledLink to="/">20 Oct 2017, 12:24</StyledLink> {'by '}
                <span className={bemText({word: true, spacing: 'xl', firstLetter: 'active'})}>
                    robot-srch-releaser
                </span>
            </p>
        </div>
    )
}

export default Branch