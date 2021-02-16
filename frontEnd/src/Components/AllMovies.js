import {UserContext} from './Contexts'
import {useContext, useEffect, useState, useRef} from 'react'
import axios from 'axios'
import {BrowserRouter as Router, Link , Switch, Route} from 'react-router-dom'
import { useHistory } from "react-router-dom";
import AllMembers from './AllMembers'

const AllMovies  = () =>
{
    const [movies, setMovies] = useState([])
    const [subscriptions,setSubscriptions] = useState([])
    const [members,setMembers] = useState([])
    let history = useHistory();
    const find = useRef(null)

    const context = useContext(UserContext)
    
    useEffect(() => {
        console.log("All Movies: "+context)

        axios.get('http://localhost:4000/routingToFront/moviesToClient')
        .then(x=>{(setMovies(x.data))}).catch(error => {console.log(error)}) 

       //getting the subscriptions from the Web Service(DB)
       axios.get('http://localhost:4000/routingToFront/subscriptionToClient')
       .then(x=>{setSubscriptions(x.data)})

      //getting the members from the Web Service
      axios.get('http://localhost:4000/routingToFront/membersToClient')
      .then(x=>{setMembers(x.data)})

      },[]);


      const subscriptionWatched = (index,item) =>
      {
        return subscriptions.map(s =>
          {
            return s.Movies.map(movies =>
              {
                if(movies.movieName === item.Name)
                {
                  return members.map(m=>
                    {
                      if(s.MemberId === m._id)
                      {
                        return <li key = {index}><Link to="/main/Subscriptions/AllMembers">{m.Name}</Link>, {movies.date}</li>
                      }
                    })
                }
              })
          })
      }
     

      function handleEdit(id,name)
      {
       history.push("/main/movies/EditMovie/"+id+"/"+name)
      }

      function handleDelete(id, name)
      {
        //delete the movie
        axios.delete('http://localhost:8000/routingToCinemaWS/deleteMovie/'+id)
        
        //delete the movie's subscriptions(only the movie)==> (update)
        //the code if's - if the movies fount out in one of the subscribers pass only the other movies of the same subscriber
        let arrOfNotSubscribe = []
        let mId = ""
        let subId = ""
        subscriptions.forEach(s=>
          {
            s.Movies.forEach(m=>
              {
                if(m.movieName === name)
                {
                  s.Movies.forEach(x =>
                    {
                      if(x.movieName !== name)
                      {
                        mId = s.MemberId
                        subId = s._id
                        arrOfNotSubscribe.push({movieName: x.movieName, date: x.date})
                      }
                    })
                  
                }
              })
          })
         
        const unsubscribeMovie = {
          movies: arrOfNotSubscribe,
          memberId: mId
        }
        console.log(arrOfNotSubscribe)
        axios.put('http://localhost:8000/routingToCinemaWS/editSubscription/'+subId, unsubscribeMovie)
        .then(resp=> console.log(resp))

         //reload the page because of the changes
         window.location.reload(false);
      }

      const findMovie = () =>
      {
        // console.log(find.current.value)
        let arr = []
        movies.forEach(x=>
          {
            var n = x.Name.startsWith(find.current.value)
            if(n === true)
            {
              arr.push(x)
            }
          })
          setMovies(arr)
      }
      
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
          display: "inline-block", width: "660px",   marginLeft: "10px" }}>
            Subscriptions watched
            <ul>
              {subscriptionWatched(index,item)}
            </ul>
            <Switch>
            <Route path = "/main/Subscriptions/AllMembers" component = {AllMembers}/>
            </Switch>
          </div>
          <br/><br/>
          <input type ="button" value = "Edit" onClick = {()=> handleEdit(item._id,item.Name)}/>
          <input type ="button" value = "Delete" onClick = {()=> handleDelete(item._id, item.Name)}/>

        </div> 
      })

      
    return(
       <div >
       Find Movie: <input type = "text" name = "find" ref = {find}/>
       <input type ="button" value = "Find" onClick = {findMovie}/> <br/><br/>
       {items}
       </div>
    ) 
}

export default AllMovies
