import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'

const AllMembers  = () =>
{

    const context = useContext(UserContext)
    useEffect(() => {
        console.log("All Members: "+context)

      },[]);

    return(
       <div>
       <h1>All Members</h1>
       </div>
    ) 
}

export default AllMembers
