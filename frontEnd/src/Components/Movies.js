import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'

const Movies  = () =>
{

    const context = useContext(UserContext)
    console.log("Movies: "+context)


    return(
       <div>
       <h1>Movies</h1>
       </div>
    ) 
}

export default Movies
