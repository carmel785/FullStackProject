import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'
import AllMembers from './AllMembers'
import AddMember from './AddMember'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'

const Subscriptions  = () =>
{

    const context = useContext(UserContext)
    useEffect(() => {
        console.log("Subscriptions: "+context)

      },[]);

    return(
      <div>
      <ul className="w3-bar w3-black">
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/Subscriptions/AllMembers">All Members</Link></li>
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/Subscriptions/AddMember" >Add Member</Link></li>
      </ul>
      
      <Switch>
          <Route path = "/main/Subscriptions/AllMembers" component = {AllMembers}/>
          <Route path = "/main/Subscriptions/AddMember" component = {AddMember}/>
      </Switch>

      </div>
    ) 
}

export default Subscriptions
