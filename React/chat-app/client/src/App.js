import React from "react"
import AppRoutes from './components/AppRoutes'
import Bar from './components/Bar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import './App.css'
import { Container } from "react-bootstrap"



function App() {

	return (
		<Router>
			<Bar />
			<Container style={{backgroundColor: '#ff8800'}}>
				<AppRoutes />	
			</Container>
		</Router>
	)
}

export default App;
