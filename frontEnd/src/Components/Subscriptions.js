import AllMembers from './AllMembers'
import AddMember from './AddMember'
import EditMember from './EditMember'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'

const Subscriptions  = () =>
{
    return(
      <div>
      <ul className="w3-bar w3-black">
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/subscriptions/AllMembers">All Members</Link></li>
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/subscriptions/AddMember" >Add Member</Link></li>
      </ul>
      
      <Switch>
          <Route path = "/main/Subscriptions/AllMembers" component = {AllMembers}/>
          <Route path = "/main/Subscriptions/AddMember" component = {AddMember}/>
          <Route path = "/main/Subscriptions/EditMember/:id/:name" component = {EditMember}/>
      </Switch>

      </div>
    ) 
}

export default Subscriptions
