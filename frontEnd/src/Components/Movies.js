import axios from 'axios'
import AllMovies from './AllMovies'
import AddMovie from './AddMovie'
import EditMovie from './EditMovie'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'
import {useState} from 'react'

const Movies  = () =>
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
                                if(p === "View Movies")
                                {
                                    setViewAxios(true)
                                }
                                if(p === "Create Movies")
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
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/movies/AllMovies">All Movies</Link></li>
          <li className="w3-bar-item w3-button tablink"><Link to = "/main/movies/AddMovie" >Add Movie</Link></li>
      </ul>
      
      <Switch>
          {CheckPermissions()}
          {viewAxios ? <Route path = "/main/movies/AllMovies" component = {AllMovies}/> 
                : <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
                    <h2>Sorry you dont have any Movie Permission</h2>
                  </div>
                }

          {createAxios ? <Route path = "/main/movies/AddMovie" component = {AddMovie}/>
                : <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
                    <h2>Sorry you dont have Add Movie Permission</h2>
                  </div>
                }

          <Route path = "/main/movies/EditMovie/:id/:name" component = {EditMovie}/>

      </Switch>

      </div>
    ) 
}

export default Movies
