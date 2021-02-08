import {UserContext} from './Contexts'
import {useContext, useEffect} from 'react'
import AllMovies from './AllMovies'
import AddMovie from './AddMovie'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'

const Movies  = () =>
{

    const context = useContext(UserContext)
    useEffect(() => {
        console.log("Movies: "+context)

      },[]);

    return(
      <div>
      <ul className="w3-bar w3-black">
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/movies/AllMovies">All Movies</Link></li>
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/movies/AddMovie" >Add Movie</Link></li>
      </ul>
      
      <Switch>
          <Route path = "/main/movies/AllMovies" component = {AllMovies}/>
          <Route path = "/main/movies/AddMovie" component = {AddMovie}/>
      </Switch>

      </div>
    ) 
}

export default Movies
