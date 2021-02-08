import '../App.css';
import ManageUsers from './ManageUsers'
import Movies from './Movies'
import Subscriptions from './Subscriptions'
import Login from './Login'
// import '../App.css'
import '../w3.css'
import {BrowserRouter as Router, Link , Switch, Route, useLocation} from 'react-router-dom'
import {UserContext} from './Contexts'
import {AdminContext} from './Contexts'
import {useEffect, useState, useContext} from 'react'


const Main  = () =>
{
    let location = useLocation() //getting the user from Login page through state
    const admin = useContext(AdminContext)
    let [user,setUser] = useState("")

    useEffect(() => { 
        console.log("main: "+location.state)
        setUser(location.state) // save the user from location to state
      }, []);

      //passing the state with context api to all tabs

        function checkAdmin()
        {// only Admin can see the User managment tab
          if(user == admin)
          {
             return <li className="w3-bar-item w3-button tablink"><Link to= "/main/manageUsers">Users Management</Link></li>
          }
        }

    return(
        <div>
            <ul className ="w3-bar w3-blue">
                <li className = "w3-bar-item w3-button tablink"><Link to = "/main/movies" >Movies</Link></li>
                <li className = "w3-bar-item w3-button tablink"><Link to = "/main/subscriptions" >Subscriptions</Link></li>
                {checkAdmin()}
                <li className="w3-bar-item w3-button tablink"><Link to = "/" >Log Out</Link></li>
            </ul>

            <UserContext.Provider value = {user}>
                <Route path = "/main/manageUsers" component = {ManageUsers}/>
                <Route path = "/main/movies" component = {Movies}/>
                <Route path = "/main/subscriptions" component = {Subscriptions}/>
            </UserContext.Provider>
         </div>
        
    ) 
}

export default Main
