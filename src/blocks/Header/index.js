import React from  'react'
import './index.scss'

import LogoArcanum from './../LogoArcanum'
import Navigation from './../Navigation'
import Dropdown from './../Dropdown'
import './../Text/index.scss'

export default () => {
    return <header className='Header'>
        <Navigation mods={{view: 'primary'}}>
            <Navigation.Item>
                <LogoArcanum />
            </Navigation.Item>
            <Navigation.Item mods={{selected: true}}>
                <Dropdown title='repository'>
                </Dropdown>
            </Navigation.Item>
        </Navigation>
    </header>
}