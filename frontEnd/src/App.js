import axios from 'axios'
import { useState } from 'react';
import Login from './Components/Login'
import CreateAccount from './Components/CreateAccount'
import NoUser from './Components/NoUser'
import Main from './Components/Main'
import {BrowserRouter as Router,Link, Switch, Route} from 'react-router-dom'

const App  = () =>
{
    return(
        <div>
            <h1>Movies- Subscriptions Web Site</h1>
            <Switch>
            <Route exact path = "/" component = {Login}/>
            <Route path = "/createAccount" component = {CreateAccount}/>
            <Route path = "/noUser" component = {NoUser}/>
            <Route path = "/main" component = {Main}/>

            </Switch>
        </div>
    ) 
}

export default App;


/*const allDataBase = () =>  {
    //ALL DATA FROM THE WEB SERVIECES

    //FROM WE SITE(in past)
    // axios.get('http://localhost:4000/routingToFront/UsersDB')
    //   .then(resp=> this.setState({users: resp.data}))

    // axios.get('http://localhost:4000/routingToFront/PermissionsJson')
    //   .then(resp=> this.setState({users: resp.data}))

    // axios.get('http://localhost:4000/routingToFront/UsersJson')
    //   .then(resp=> this.setState({users: resp.data}))

    //FROM WEB SERVICE
    // axios.get('http://localhost:4000/routingToFront/membersToClient')
    //   .then(resp=> this.setState({users: resp.data}))

    // axios.get('http://localhost:4000/routingToFront/moviesToClient')
    //   .then(resp=> this.setState({users: resp.data}))

    // axios.get('http://localhost:4000/routingToFront/subscriptionToClient')
    //   .then(resp=> this.setState({users: resp.data}))
  }*/