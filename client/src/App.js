import React, { useEffect } from 'react';
import Header from './blocks/Header'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import { fetchRepositories } from './actions/repositories'

import Files from './pages/Files'
import File from './pages/File'
import Index from './pages/Index'

function App({ onInit, repositories }) {
    useEffect(onInit, [])

	return (
		<div className="App">
			<Header repositories={repositories}></Header>
			<Route exact path='/' component={Index}></Route>
			<Route path='/repos/:repositoryId/tree/:commitHash?/:path(.*)?' component={Files}></Route>
			<Route path='/repos/:repositoryId/blob/:commitHash/:path(.*)' component={File}></Route>
		</div>
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