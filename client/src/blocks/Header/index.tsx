import React from  'react'
import StyledLink from '../StyledLink'

import './index.scss'

import LogoArcanum from '../LogoArcanum'
import Navigation from '../Navigation'
import Dropdown from '../Dropdown'

import { cn } from '@bem-react/classname'
export const bemCls = cn('Header')

interface HeaderProps {
    repositories: Array<string>,
    className?: string
}

const Header = ({ repositories, className }: HeaderProps): JSX.Element => {
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