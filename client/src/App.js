import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Menu from "./components/layouts/menu";
import Form from "./components/form";
import PrivateRoute from "./components/protectedRoute";
import JokeList from "./components/jokeList";

function App() {
  return (
    <Router>
      <Menu />
      <Route path="/register" component={Form} />
      <Route path="/login" component={Form} />
      <PrivateRoute path="/" exact component={JokeList} />
    </Router>
  );
}

export default App;
