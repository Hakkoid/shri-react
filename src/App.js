import React from 'react';
import Header from './blocks/Header'
import { Route } from 'react-router-dom'

import Files from './pages/Files'
import Index from './pages/Index'

function App() {

	return (
		<div className="App">
			<Header></Header>
			<Route exact path='/' component={Index}></Route>
			<Route path='/repos/:repositoryId/tree/:commitHash?/:path(.*)?' component={Files}></Route>
		</div>
	);
}

export default App;
