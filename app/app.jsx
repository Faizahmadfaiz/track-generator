import React from 'react';
import ReactDOM from 'react-dom';
import {Route, Router, IndexRoute, hashHistory, browserHistory} from 'react-router';

import Main from './components/Main';
import Tracks from './components/Tracks';
import Search from './components/Search';

//Load foundation
$(document).foundation();

//App css
require('style!css!sass!applicationStyles');

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={Main}>
      <Route path="tracks" component={Tracks}/>
      <IndexRoute component={Search}/>    
    </Route>
  </Router>,
  document.getElementById('app')
);
