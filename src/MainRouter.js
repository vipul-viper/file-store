import React from "react";
import {Route, Switch } from "react-router-dom";


import Login from './Login'
import Home from "./Home"
import Gal from "./Gal"
import Store from "./Store"
import allstore from "./allstore"




const MainRouter = () => (
    
    <div>
       
       
        <Switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/gal/:id" component={Gal} /> 
        <Route exact path="/store" component={Store} /> 
        <Route exact path="/allstore" component={allstore} />
        

         {/* <PrivateRoute component={Gal} path="/gal/:id" exact />  */}
         
          
        </Switch>
    </div>
);

export default MainRouter;
