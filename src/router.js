import React from 'react';
import {Switch, Route} from 'react-router-dom';

import CreateSet from './components/CreateSet';
import LandingPage from './components/LandingPage';
import LatestActivity from './components/LatestActivity';
import SetDetail from './components/SetDetail';
import Settings from './components/Settings';
import Flashcards from './components/Flashcards';
import SearchResults from './components/SearchResults';

export default (
    <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/create-set' component={CreateSet}/>
        <Route path='/activity' component={LatestActivity}/>
        <Route path='/set-detail/:id' component={SetDetail}/>
        <Route path='/settings' component={Settings}/>
        <Route path='/flashcards/:id' component={Flashcards}/>
        <Route path='/search-results' component={SearchResults}/>
    </Switch>
);