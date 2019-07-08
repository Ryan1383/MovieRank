import React , {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './css/App.css';
import Movie from './Movie';
import Header from './Header';
import MovieDetail from './MovieDetail';
import MovieCast from './MovieCast';

class App extends Component {

  render(){
    return (
      <React.Fragment>
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={Movie} />
            <Route path="/detail/:id" component={MovieDetail} />
            <Route path="/cast/:id" component={MovieCast} />
          </Switch>
        </Router>
      </React.Fragment>

    );
  }
}

export default App;
