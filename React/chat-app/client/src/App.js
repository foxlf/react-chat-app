import React from "react"
import AppRoutes from './components/AppRoutes'
import Bar from './components/Bar'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
//import './App.css'



function App() {

	return (
		<Router>
			<Bar />
			<h1>Hi</h1>
			<AppRoutes />			
		</Router>
	)
}

export default App;
