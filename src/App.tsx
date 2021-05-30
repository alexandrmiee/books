import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="books"></Route>
      </Switch>
    </BrowserRouter>
  );
};

export default App;
