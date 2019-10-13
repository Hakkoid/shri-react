import React from  'react'
import StyledLink from './../StyledLink'

import './index.scss'

import LogoArcanum from './../LogoArcanum'
import Navigation from './../Navigation'
import Dropdown from './../Dropdown'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Header')

const Header = ({ repositories, className }) => {
    let cls = bemCls()
    cls += className ? ` ${className}` : ''


    return <header className={cls}>
        <Navigation mods={{view: 'primary'}}>
            <Navigation.Item>
                <LogoArcanum />
            </Navigation.Item>
            <Navigation.Item mods={{selected: true}}>
                <Dropdown title='repository'>
                    {
                        repositories.map((repository, index) => {
                            return (
                                <StyledLink color='main' key={index} to={`/repos/${repository}/tree/`}>
                                    {repository}
                                </StyledLink>
                            )
                        })
                    }
                </Dropdown>
            </Navigation.Item>
        </Navigation>
    </header>
}

export default Header