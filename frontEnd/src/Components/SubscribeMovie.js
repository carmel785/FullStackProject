import axios from 'axios'
import {useEffect, useState} from 'react'
import { useForm } from 'react-hook-form';


const SubscribeMovie  = (props) =>
{
  const { register, handleSubmit, errors } = useForm(); // initialize the hook

  // const [subClicked, setSubClicked] = useState([])
  const [movies,setMovies] = useState([])
  const [subMovies,setSubMovies] = useState([])

  useEffect(() => {
    // get all movies
    axios.get('http://localhost:4000/routingToFront/moviesToClient')
    .then(x=>{(setMovies(x.data))}).catch(error => {console.log(error)}) 
    setSubMovies(props.movies)

  },[movies]);
  
  let items = movies.map((item,index)=>
  {
    let arrNoSubMovies = movies
    movies.forEach((item,index) =>
    {
      subMovies.forEach(sMovie =>{
        if(sMovie === item.Name)
          {
            arrNoSubMovies.splice(index,1)
            setMovies(arrNoSubMovies)
          }
        })
    })
    return <option value = {item.Name} key= {index} >{item.Name}</option>
      
  })

  const onSubmit = async (data) =>
  {
    //movieName,date,memberId
    const newSub = {
      movieName: data.movies,
      date: data.date,
      memberId: props.item._id
    }
    console.log(newSub)
    axios.post('http://localhost:4000/routingToFront/addSubscription',newSub)
    .then(resp => console.log(resp)).catch((error) =>
    {
        console.log("problem is in subscribeMovie page")
    })
    window.location.reload(false);

  }
 
    return(
       <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
          Add new Movie <br/>
          <form onSubmit = {handleSubmit(onSubmit)}>
            <select name="movies" id="movies" ref={register}>
              {items}
            </select>
            <input type = "date" name= "date" ref={register}/><br/>
            <input type = "submit" value = "Subscribe" /><br/>
          </form>
        </div>
    ) 
}


export default SubscribeMovie
