import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';
import Navbar  from './components/Navbar';

function MainRouter(){
    return (
        <Router>
<Switch>
    <Route exact path='/' component={Login} />
    <Route exact path="/game" component={Game}/> 
    <Route exact path="/game" component={Navbar}/>
    
</Switch>
        </Router>

    );
}

export default MainRouter;