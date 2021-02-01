import {UserContext} from './UserContext'
import {useContext, useEffect} from 'react'

const Subscriptions  = () =>
{

    const context = useContext(UserContext)
    console.log("Subscriptions: "+context)

    return(
       <div>
       <h1>Subscriptions</h1>
       </div>
    ) 
}

export default Subscriptions
