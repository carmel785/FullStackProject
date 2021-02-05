import axios from 'axios'
import { useState } from 'react';
import Login from './Components/Login'
import CreateAccount from './Components/CreateAccount'
import NoUser from './Components/NoUser'
import Main from './Components/Main'
import {BrowserRouter as Router,Link, Switch, Route} from 'react-router-dom'
import {AdminContext} from './Components/Contexts'


const App  = () =>
{
    const [admin , setAdmin] = useState({})
    axios.get('http://localhost:4000/routingToFront/AdminJson')
    .then(x=>{setAdmin(x.data)})

    return(
        <div>
            <h1>Movies- Subscriptions Web Site</h1>
            <AdminContext.Provider value = {admin.user}> 
                <Route exact path = "/" component = {Login}/>
                <Route path = "/createAccount" component = {CreateAccount}/>
                <Route path = "/noUser" component = {NoUser}/>
                <Route path = "/main" component = {Main}/>
           </AdminContext.Provider>
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