import React, { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import VolunteerPanel from './components/VolunteerPanel';
import Residents from './components/Residents/Residents';
import RentBicycle from './components/Rentings/RentBicycle';
import Rentings from './components/Rentings/Rentings';
import FindBike from './components/FindBike';
import AddTime from './components/AddTime';
import AllBicycles from './components/Bicycles/Bicycles';
import AddNewBicycle from './components/AddNewBicycle';
import CreateNewRenter from './components/CreateNewRenter';

function App() {
  return (
    <Router>
      <Switch>
        {/* Volunteers */}
        <Route exact path="/rentbicycle" component={RentBicycle} />
        <Route exact path="/findbike" component={FindBike} />
        <Route exact path="/addtime" component={AddTime} />
        <Route exact path="/rentings" component={Rentings} />
        <Route exact path="/residents" component={Residents} />
        <Route exact path="/bicycles" component={AllBicycles} />
        <Route exact path="/addnewbicycle" component={AddNewBicycle} />
        <Route exact path="/createnewrenter" component={CreateNewRenter} />
        <VolunteerPanel />
      </Switch>
    </Router>
  );
}

export default App;
