import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'

const AddMovie  = () =>
{

    const context = useContext(UserContext)
    useEffect(() => {
        console.log("Add Movie: "+context)

      },[]);

    return(
       <div>
       <h1>Add Movies</h1>
       </div>
    ) 
}

export default AddMovie
