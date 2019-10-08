import React from 'react';

import Layout from './../../blocks/Layout'
import Branch from './../../blocks/Branch'
import Hr from './../../blocks/Hr'
import Navigation from './../../blocks/Navigation'
import FileList from './../../blocks/FileList'
import { bemCls as bemText } from './../../blocks/Text'


const Nav = () => {
    return (
        <Navigation>
            <Navigation.Item mods={{selected: true}}>
                <Navigation.Link to='/'>
                    <b>FILES</b>
                </Navigation.Link>
            </Navigation.Item>
            <Navigation.Item>
                <Navigation.Link to='/'>
                    <b>BRANCHES</b>
                </Navigation.Link>
            </Navigation.Item>
        </Navigation>
    )
}

export default ({ match }) => {
    return (
        <Layout>
            <Layout.Section>
                <h1 className={bemText({ type: 'h1', size: 'm' })}>arcadia</h1>
                <Hr />
                <Branch></Branch>
                <Nav />
                <FileList params={match.params}/>
            </Layout.Section>
        </Layout>
    )
}