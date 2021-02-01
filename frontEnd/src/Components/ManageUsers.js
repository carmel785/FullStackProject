import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'
import Users from './Users'
import AddUser from './AddUser'
import EditUser from './EditUser'
import {useContext, useEffect} from 'react'
import {UserContext} from './UserContext'
// import '../App.css'
import '../w3.css'

const ManageUsers  = () =>
{
    const context = useContext(UserContext)

    // useEffect(() => {
    // // console.log("manager: "+context)

    //   },[]);
      console.log("manager: "+context)
    
    return(
        <div>
        <ul class="w3-bar w3-black">
            <li class="w3-bar-item w3-button tablink"><Link to = "/main/manageUsers/users">Users</Link></li>
            <li class="w3-bar-item w3-button tablink"><Link to = "/main/manageUsers/addUser" >AddUser</Link></li>
        </ul>
        
        <Switch>
            <Route path = "/main/manageUsers/users/" component = {Users}/>
            <Route path = "/main/manageUsers/addUser/" component = {AddUser}/>
            <Route path = "/main/manageUsers/EditUser/:name" component = {EditUser}/>
            
        </Switch>

        </div>
    ) 
}

export default ManageUsers
