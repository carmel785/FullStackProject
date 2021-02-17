import AllMembers from './AllMembers'
import AddMember from './AddMember'
import EditMember from './EditMember'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'
import {useState} from 'react'
import axios from 'axios'

const Subscriptions  = () =>
{
    const [viewAxios,setViewAxios] = useState(false)
    const [createAxios,setCreateAxios] = useState(false)

    function CheckPermissions()
    { 
       axios.get('http://localhost:4000/routingToFront/UsersDBFullData')
        .then((allUsers)=>{ 
            return allUsers.data.forEach(user =>
                  {
                    if(user.userName === sessionStorage["user"])
                    {
                        return user.permissions.forEach(p=>
                            {
                                if(p === "View Subscriptions")
                                {
                                    setViewAxios(true)
                                }
                                if(p === "Create Subscriptions")
                                {
                                    setCreateAxios(true)
                                }
                            })
                    }
                  })
        })
    }
    
    return(
      <div>
      <ul className="w3-bar w3-black">
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/subscriptions/AllMembers">All Members</Link></li>
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/subscriptions/AddMember" >Add Member</Link></li>
      </ul>
      
      <Switch>
      {CheckPermissions()}

      {viewAxios ? <Route path = "/main/subscriptions/AllMembers" component = {AllMembers}/> 
                : <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
                    <h2>Sorry you dont have any Subscriptions Permission</h2>
                  </div>
                }

          {createAxios ? <Route path = "/main/subscriptions/AddMember" component = {AddMember}/>
                : <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
                    <h2>Sorry you dont have Add Member Permission</h2>
                  </div>
                }
          
          <Route path = "/main/Subscriptions/EditMember/:id/:name" component = {EditMember}/>
      </Switch>

      </div>
    ) 
}

export default Subscriptions
