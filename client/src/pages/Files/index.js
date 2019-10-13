import React from 'react';

import Layout from './../../blocks/Layout'
import Branch from './../../blocks/Branch'
import Hr from './../../blocks/Hr'
import Navigation from './../../blocks/Navigation'
import FileList from './../../blocks/FileList'
import Path from './../../blocks/Path'


const Nav = () => {
    return (
        <Navigation>
            <Navigation.Item mods={{ selected: true }}>
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
    const {
        commitHash,
        path,
        repositoryId
    } = match.params

    return (
        <Layout.Section>
            <Path {...{ hash: commitHash, path, repositoryId, isDirectory: true }} />
            <Hr />
            <Branch></Branch>
            <Nav />
            <FileList params={match.params} />
        </Layout.Section>
    )
}