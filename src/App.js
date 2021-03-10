import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import SignUp from './screens/SignUp';
import SignIn from './screens/SignIn';
import MovieList from './screens/MovieList';

function App() {
  return (
    <div className="app">
      <Router>
          <Switch>
            <Route path="/signin">
              <SignIn />
            </Route>
            <Route path="/movies">
              <MovieList />
            </Route>
            <Route exact path="/">
              <SignUp />
            </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
