import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import Game from './components/Game';
function MainRouter(){
    return (
        <Router>
<Switch>
    <Route exact path='/' component={Login} />
    <Route exact path="/game" component={Game}/> 
</Switch>
        </Router>

    );
}

export default MainRouter;