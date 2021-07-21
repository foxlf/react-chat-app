import React, { useEffect, useState } from 'react'
import {Redirect, Route, Switch } from "react-router"
import { privateRoutes, publicRoutes } from "./routes"
import { useLocalStorage } from "../hooks/useLocalStorage"

export default function AppRoutes(){
    // function checkLog() {
    // const [isLogined] = useLocalStorage('isLogined')
    //const [isLogined, setIsLogined] = useState('true')
    // }
    //window.localStorage.setItem('isLogined', false)
    //window.localStorage.clear()
    const [isLogined] = useLocalStorage('isLogined', false)
    //  useEffect(() => {
    //      setIsLogined(window.localStorage.getItem('isLogined'))
    //      console.log('checked: ' + isLogined +'s')
    //  }, [])
    //console.log('checked: ' + isLogined)
    console.log('isLogined: ' + isLogined + 'localStorage: ' + typeof(isLogined))
    return(
        <Switch>
            {isLogined && privateRoutes.map(({path, Component}) => 
                <Route key={path} path={path} component={Component} exact/>
            )}
            {publicRoutes.map(({path, Component}) =>
                <Route key={path} path={path} component={Component} exact/>
            )}
            <Redirect to={'/'}/>
        </Switch>
    )
}