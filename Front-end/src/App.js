import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";

import ProtectedRoute from './components/ProtectedRoute';
import HomePage from './components/HomePage';
import Login from './components/Login';
import SignUp from "./components/SignUp"
import Residents from './components/Residents/Residents';
import RentBicycle from './components/RentBike/RentBicycle';
import Rentings from './components/Rentings/Rentings';
import UserHistory from './components/Residents/UserHistory';
import BikeHistory from './components/Bicycles/BikeHistory';
import AllBicycles from './components/Bicycles/Bicycles';
import AddNewBicycle from './components/Bicycles/AddNewBicycle';
import CreateNewRenter from './components/Residents/CreateNewRenter';
import Dashboard from './components/Dashboard';
import UpdateRenter from './components/Residents/UpdateRenter';
import UpdateBicycle from './components/Bicycles/Update Bicycle';
import ForgotPassword from './components/ForgotPassword';
import ResetPassword from './components/ResetPassword';
import ProtectedResidents from './components/Residents/ProtectedRoute'


toast.configure()

function App() {

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const history = useHistory();

  const setAuth = (boolean) => {
    setIsAuthenticated (boolean);
  };

  useEffect(() => {
    if(!isAuthenticated) {
      history?.push('/login')
    }

  }, [isAuthenticated])

  // async function isAuth () {
  //   try {

  //     const response = await fetch("http://localhost:3001/auth/verify", {
  //       method: "GET",
  //       headers: { token: localStorage.token }
  //     });

  //     const parseRes = await response.json()
  //     (parseRes)

  //     parseRes === true ? setIsAuthenticated(true) :
  //     setIsAuthenticated(false);

  //   } catch (err) {
  //     console.error(err.message);
  //   }
  // }

  // useEffect(() => {
  //   isAuth()
  // })

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
        <ProtectedRoute isAuthenticated={isAuthenticated} path ="/reset-password" Component={ResetPassword}/>
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/rentbicycle" Component={RentBicycle} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/bikehistory/:id" Component={BikeHistory} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/userhistory/:id" Component={UserHistory} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/rentings" Component={Rentings} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/residents" Component={Residents} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/protectresidents" Component={ProtectedResidents} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/bicycles" Component={AllBicycles} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/addnewbicycle" Component={AddNewBicycle} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/updatebicycle/:id" Component={UpdateBicycle} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path="/updaterenter/:id" Component={UpdateRenter} />
        <ProtectedRoute isAuthenticated={isAuthenticated} path= "/createnewrenter" Component={CreateNewRenter} />
        <HomePage/>
        
      </Switch>
    </Router>
  );
}

export default App;
