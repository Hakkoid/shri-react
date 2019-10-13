import React from 'react';

import Layout from './../../blocks/Layout'
import Hr from './../../blocks/Hr'
import Repositories from './../../blocks/Repositories'

import { bemCls as bemText } from './../../blocks/Text'

export default () => {
    return (
        <Layout.Section>
            <h1 className={bemText({ type: 'h1', size: 'xl' })}>Repositories</h1>
            <Hr />
            <Repositories />
        </Layout.Section>
    )
}