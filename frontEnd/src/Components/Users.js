import axios from 'axios'
import { useState, useEffect} from 'react';
import { useHistory, useLocation } from "react-router-dom";

function Users()
{
    const [users, setUsers] = useState([])
    let history = useHistory();
    let location = useLocation()
    
    // avoiding infinite loop
    useEffect(()=> {
        console.log("location state: "+location.state)
        if(location.state !== undefined) // if the the EditUser componnent change the user values so change the users array state.
        {
            axios.get('http://localhost:4000/routingToFront/UsersDB')
            .then(allUsers => 
            {
                // allUsers.data.forEach(x=> console.log(x))
                console.log()
                var userData = allUsers.data.filter(u => u.User === location.state.prevUser)
                userData.forEach(x=>
                    {

                        // let user = {_id: x._id , User : x.User , Password : data.pwd}
                        let newArr = {
                            _id: x._id,
                            Password: x.Password,
                            prevUser: location.state.prevUser,
                            fname: location.state.fname,
                            lname: location.state.lname,
                            User: location.state.user,
                            sessionTimeOut: location.state.sessionTimeOut,
                            createM: location.state.createM,
                            createS: location.state.createS,
                            deleteM: location.state.deleteM,
                            deleteS: location.state.deleteS,
                            updateM: location.state.updateM,
                            updateS: location.state.updateS,
                            // created_date: location.state.created_date
                        }
                        axios.put('http://localhost:4000/routingToFront/UsersDB/'+x._id, newArr)
                            .then(resp => {
                                console.log(resp.data)
                                axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
                                .then(x=>{setUsers(x.data)})
                            }).catch((error) =>
                            {
                                console.log("problem in update user - user page")
                            })

                    })
            }).catch((error)=> console.log("problem in getting users in User page"))
        }
        else
        {//get Rest api request - getting all users data from the WS
            axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
            .then(x=>{setUsers(x.data)}).catch(error=> {console.log("problem in getting all data from ws in Users page")})
        }
    },[])

    // i need to get data out of the useEffect cause for the data to show its need another refresh page.
    useEffect(()=>{ 
        axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
        .then(x=>{setUsers(x.data)})
    },[])


    const editClick = (name,userName) =>
    {//update user
        console.log(name)
        history.push("/main/manageUsers/EditUser/"+name+"/"+userName);
    }

    
    const deleteClick = (userName) =>
    {//delete user
        axios.get('http://localhost:4000/routingToFront/deleteUser/'+userName)
        .then((x)=>{ 
            console.log(x)
            axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
            .then(x=>{setUsers(x.data)})
        }).catch((error)=>{
            console.log("problem with delete in user page")
        })
    }

    let items = users.map((item,index) => {
        return <div key = {index} className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
            Name: {item.fullName}<br/>
            User Name: {item.userName}<br/>
            Session Time Out: {item.sessionTimeOut}<br/>
            Created Date: {item.created_date}<br/>
            Permissions: {item.permissions.join(",")}<br/><br/>
            <input className = "w3-sans-serif" type = "button" value = "Edit" onClick = {()=> editClick(item.fullName,item.userName)} />
            <input className = "w3-sans-serif" type = "button" value = "Delete" onClick = {()=>deleteClick(item.userName) }/>
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
