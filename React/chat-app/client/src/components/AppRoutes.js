import React from 'react'
import { Redirect, Route, Switch } from "react-router";
import { privateRoutes, publicRoutes } from "./routes";

export default function AppRoutes(){
    const isLogined = false
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