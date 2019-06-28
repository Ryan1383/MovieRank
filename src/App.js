import React , {Component} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './css/App.css';
import Movie from './Movie';
import Header from './Header';
import MovieDetail from './MovieDetail';

class App extends Component {

  render(){
    return (
      <>
        <Router>
          <Header/>
          <Switch>
            <Route path="/" exact component={Movie} />
            <Route path="/:id" component={MovieDetail} />
          </Switch>

        </Router>
      </>

    );
  }
}

export default App;
