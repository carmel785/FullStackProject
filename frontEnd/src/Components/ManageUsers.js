import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'
import Users from './Users'
import AddUser from './AddUser'
import EditUser from './EditUser'
import '../w3.css'

const ManageUsers  = () =>
{
    return(
        <div>
        <ul className="w3-bar w3-black">
            <li className="w3-bar-item w3-button tablink"><Link to = "/main/manageUsers/users">Users</Link></li>
            <li className="w3-bar-item w3-button tablink"><Link to = "/main/manageUsers/addUser" >AddUser</Link></li>
        </ul>
        
        <Switch>
            <Route path = "/main/manageUsers/users/" component = {Users}/>
            <Route path = "/main/manageUsers/addUser/" component = {AddUser}/>
            <Route path = "/main/manageUsers/EditUser/:name/:userName" component = {EditUser}/>
        </Switch>

        </div>
    ) 
}

export default ManageUsers
