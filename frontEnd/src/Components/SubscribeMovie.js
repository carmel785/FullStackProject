import axios from 'axios'
import {useContext, useEffect, useState} from 'react'

const SubscribeMovie  = (props) =>
{

  // const [subClicked, setSubClicked] = useState([])
  const [movies,setMovies] = useState([])

  useEffect(() => {
    // get all movies
    axios.get('http://localhost:4000/routingToFront/moviesToClient')
    .then(x=>{(setMovies(x.data))}).catch(error => {console.log(error)}) 
  },[]);

  let items = movies.map((item,index)=>
  {
    return <option value = {item.Name} key= {index} >{item.Name}</option>
  })

    return(
       <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
          Add new Movie <br/>
          <select name="movies" id="movies">
            {items}
          </select>
          <input type = "date" name= "date"/><br/>
          <button>Subscribe</button>
  
          <ul>
            <li>movies</li>
            <li>index: {props.index}</li>
            <li>clicked : {props.clicked}</li>
          </ul>
        </div>
    ) 
}

export default SubscribeMovie
