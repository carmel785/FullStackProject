import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'

const AddMember  = () =>
{

    const context = useContext(UserContext)
    useEffect(() => {
        console.log("Add Member: "+context)

      },[]);

    return(
       <div>
       <h1>Add Member</h1>
       </div>
    ) 
}

export default AddMember
