import React,{useState,useEffect} from 'react'

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IngredientsWindow from "./IngredientsWindow"
import RecipeWindow from "./RecipeWindow"

function ReactRouterSetup() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <IngredientsWindow />
        </Route>
        <Route path='/recipe'>
          <RecipeWindow />
        </Route>
      </Switch>
    </Router>
  )
}

export default ReactRouterSetup