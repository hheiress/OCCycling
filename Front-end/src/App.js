import React, { Fragment } from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp"
import VolunteerPanel from './components/VolunteerPanel';
import Residents from './components/Residents/Residents';
import RentBicycle from './components/Rentings/RentBicycle';
import Rentings from './components/Rentings/Rentings';
import FindBike from './components/FindBike';
import AddTime from './components/AddTime';
import AllBicycles from './components/Bicycles/Bicycles';
import AddNewBicycle from './components/Bicycles/AddNewBicycle';
import CreateNewRenter from './components/Residents/CreateNewRenter';


function App() {
  return (
    <Router>
      <Switch>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/signup" component={SignUp}/>
        {/* Volunteers */}
        {/* Volunteers */}
        <Route exact path="/rentbicycle" component={RentBicycle} />
        <Route exact path="/findbike" component={FindBike} />
        <Route exact path="/addtime" component={AddTime} />
        <Route exact path="/rentings" component={Rentings} />
        <Route exact path="/residents" component={Residents} />
        <Route exact path="/bicycles" component={AllBicycles} />
        <Route exact path="/addnewbicycle" component={AddNewBicycle} />
        <Route exact path= "/createnewrenter" component={CreateNewRenter} />
        <Route exact path="/volunteerpanel" component={VolunteerPanel} />
        <HomePage/>
        
      </Switch>
    </Router>
  );
}

export default App;
