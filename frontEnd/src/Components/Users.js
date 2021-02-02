import axios from 'axios'
import { useState, useContext, useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";
import {UserContext} from './UserContext'

 function Users()
{
    const [users, setUsers] = useState([])
    let history = useHistory();
    const context = useContext(UserContext)
    let location = useLocation()
    // avoiding infinite loop
    useEffect(()=> {
        console.log("User: "+context)
        if(location.state !== undefined) // if the the EditUser componnent change the user values so change the users array state.
        {
            console.log("users location: "+location.state.fname)
            
        }
    },[])


    axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
        .then(x=>{setUsers(x.data)})
    
    const editClick = (name) =>
    {
        console.log(name)
        history.push("/main/manageUsers/EditUser/"+name);
    }

    let items = users.map((item,index) => {
        return <div key = {index} class="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
            Name: {item.fullName}<br/>
            User Name: {item.userName}<br/>
            Session Time Out: {item.sessionTimeOut}<br/>
            Created Date: {item.created_date}<br/>
            Permissions: {item.permissions.join(",")}<br/><br/>
            <input class = "w3-sans-serif" type = "button" value = "Edit" onClick = {()=> editClick(item.fullName)} />
            <input class = "w3-sans-serif" type = "button" value = "Delete" />

        </div>
    })    
    return(
       <div class="w3-container">
       <h1>Users</h1>
       {items}
       </div>
    ) 
}

export default Users
