import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'

const Subscriptions  = () =>
{
    const context = useContext(UserContext)
    
    useEffect(() => {
        console.log("Subscriptions: "+context)

      },[]);

    return(
       <div>
       <h1>Subscriptions</h1>
       </div>
    ) 
}

export default Subscriptions
