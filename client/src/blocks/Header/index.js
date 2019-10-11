import React from  'react'
import StyledLink from './../StyledLink'

import './index.scss'

import LogoArcanum from './../LogoArcanum'
import Navigation from './../Navigation'
import Dropdown from './../Dropdown'
import './../Text/index.scss'

export default ({ repositories }) => {
    return <header className='Header'>
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