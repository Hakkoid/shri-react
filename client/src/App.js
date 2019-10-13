import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchRepositories } from './actions/repositories'

import Header from './blocks/Header'
import Footer from './blocks/Footer'
import Layout, { bemCls as bemLayout } from './blocks/Layout'

import Files from './pages/Files'
import File from './pages/File'
import Index from './pages/Index'

function App({ onInit, repositories }) {
    useEffect(onInit, [])

    return (
        <Layout>
            <Header className={bemLayout('Header')} repositories={repositories} />
            <Route exact path='/' component={Index}></Route>
            <Route path='/repos/:repositoryId/tree/:commitHash?/:path(.*)?' component={Files}></Route>
            <Route path='/repos/:repositoryId/blob/:commitHash/:path(.*)' component={File}></Route>
            <Footer className={bemLayout('Footer')} />
        </Layout>
    );
}

const mapStateToProps = ({ repositories }) => { return { repositories } }
const mapDispatchToProps = dispatch => {
    return {
        onInit: () => {
            dispatch(fetchRepositories())
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)