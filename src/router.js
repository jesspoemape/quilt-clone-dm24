import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CreateSet from './components/CreateSet';
import LandingPage from './components/LandingPage';
import LatestActivity from './components/LatestActivity';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/create-set' component={CreateSet}/>
        <Route path='/activity' component={LatestActivity}/>
    </Switch>
);