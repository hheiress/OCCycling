import React, { Fragment, useState, useEffect } from 'react';

import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp"
import VolunteerPanel from './components/VolunteerPanel';
import Residents from './components/Residents/Residents';
import RentBicycle from './components/RentBike/RentBicycle';
import Rentings from './components/Rentings/Rentings';
import FindBike from './components/SetTimer';
// import UpdateRenting from './components/Rentings/UpdateRenting';
import AllBicycles from './components/Bicycles/Bicycles';
import AddNewBicycle from './components/Bicycles/AddNewBicycle';
import CreateNewRenter from './components/Residents/CreateNewRenter';
import Dashboard from './components/Dashboard';
import UpdateRenter from './components/Residents/UpdateRenter';
import Footer from './components/Footer';
import UpdateBicycle from './components/Bicycles/Update Bicycle';
import ForgotPassword from './components/ForgotPassword';
import DeleteBike from './components/Bicycles/DeleteBike';
import ResetPassword from './components/ResetPassword';



toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const setAuth = (boolean) => {
    setIsAuthenticated (boolean);
  };

  async function isAuth () {
    try {

      const response = await fetch("http://localhost:3001/auth/verify", {
        method: "GET",
        headers: { token: localStorage.token }
      });

      const parseRes = await response.json()
      console.log(parseRes)

      parseRes === true ? setIsAuthenticated(true) :
      setIsAuthenticated(false);

    } catch (err) {
      console.error(err.message);
    }
  }

  useEffect(() => {
    isAuth()
  })

  return (
    <Router>
      <Switch>
      <Route exact path="/login" 
         render = {props => 
          !isAuthenticated ? ( <Login {...props} setAuth = {setAuth} /> ) : 
            ( <Redirect to = "/dashboard" /> ) 
        } 
      />
      <Route exact path="/signup"
        render = {props => 
          !isAuthenticated ? ( <SignUp {...props} setAuth = {setAuth} /> ) :
            ( <Redirect to = "/dashboard" /> )
       }
     /> 
      <Route exact path="/dashboard" 
        render = {props => 
          isAuthenticated ? ( <Dashboard {...props} setAuth = {setAuth} /> ) :
           ( <Redirect to = "/login" /> )
       }
      />

        {/* Volunteers */}
        {/* Volunteers */}
        <Route exact path = "/forgot-password" render={props => <ForgotPassword {...props} setAuth = {setAuth}/> } /> {/* investigar sobre setAuth, borrar?*/}
        <Route exact path ="/reset-password" component={ResetPassword}/>
        <Route exact path="/rentbicycle" component={RentBicycle} />
        <Route exact path="/findbike" component={FindBike} />
        <Route exact path="/rentings" component={Rentings} />
        <Route exact path="/residents" component={Residents} />
        <Route exact path="/bicycles" component={AllBicycles} />
        <Route exact path="/addnewbicycle" component={AddNewBicycle} />
        <Route path="/updatebicycle/:id" component={UpdateBicycle} />
        <Route path="/updaterenter/:id" component={UpdateRenter} />
        <Route exact path= "/createnewrenter" component={CreateNewRenter} />
        <Route exact path="/volunteerpanel" component={VolunteerPanel} />
        <HomePage/>
        
      </Switch>
    </Router>
  );
}

export default App;
