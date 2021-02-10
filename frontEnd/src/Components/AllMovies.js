import {UserContext} from './Contexts'
import {useContext, useEffect, useState} from 'react'
import axios from 'axios'

const AllMovies  = () =>
{
    const [movies, setMovies] = useState([])
    const context = useContext(UserContext)
    useEffect(() => {
        console.log("All Movies: "+context)
        axios.get('http://localhost:4000/routingToFront/moviesToClient')
        .then(x=>{(setMovies(x.data))}).catch(error => {console.log(error)}) 
      },[]);


      
      const getOnlyYear = (date) =>
      {
        let x = date.slice(0,4)
        return x
      }

      let items = movies.map((item,index)=>
      {
        return <div key= {index} className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
        <div style = {{display: "block"}}>
        {item.Name}, {getOnlyYear(item.Premiered)}<br/>
          Genres: {item.Genres.join(",")}<br/><br/>
        </div>
          
          <img src= {item.Image} alt="movies" style= {{display: "inline", height: "250px"}}/>
          <div className="w3-green w3-hover-shadow w3-padding-32 w3-bordered w3-code" style= {{border: "3px solid", 
          display: "inline-block", width: "750px",   marginLeft: "10px" }}>
            Subscriptions watched
            <ul>
              <li></li>
              <li></li>
            </ul>
          </div>
          <br/><br/>
          <input type ="button" value = "Edit" />
          <input type ="button" value = "Delete"/>

        </div> 
      })

      
    return(
       <div >
       Find Movie: <input type = "text" name = "find" />
       <input type ="button" value = "Find"/> <br/><br/>
       {items}
       </div>
    ) 
}

export default AllMovies
