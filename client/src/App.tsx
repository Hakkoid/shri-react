import React, { useEffect } from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'
import { Dispatch } from 'redux'

import { fetchRepositories } from './redux/repositories/actions'

import Header from './blocks/Header'
import Footer from './blocks/Footer'
import Layout, { bemCls as bemLayout } from './blocks/Layout'

import Files from './pages/Files'
import File from './pages/File'
import Index from './pages/Index'

interface AppProps {
    onInit: () => void,
    repositories: Array<string>
}

const App = ({ onInit, repositories }: AppProps): JSX.Element => {
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

interface StateRepositories {
    repositories: Array<string>
}

const mapStateToProps = ({ repositories }: StateRepositories) => { return { repositories } }
const mapDispatchToProps = (dispatch: Dispatch) => {
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