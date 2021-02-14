import axios from 'axios'
import {UserContext} from './Contexts'
import {useContext, useEffect, useState} from 'react'
import SubscribeMovie from "./SubscribeMovie"
const AllMembers  = () =>
{

    const [members,setMembers] = useState([])
    const [subscriptions,setSubscriptions] = useState([])
    const [subClicked, setSubClicked] = useState([])
    const [watchedMovies, setWatchedMovies] = useState([])

    const context = useContext(UserContext)
   
    useEffect(() => {
        console.log("All Members: "+context)

        //getting the members from the Web Service
        axios.get('http://localhost:4000/routingToFront/membersToClient')
          .then(x=>{setMembers(x.data)})
        
        
        //getting the subscriptions from the Web Service(DB)
        axios.get('http://localhost:4000/routingToFront/subscriptionToClient')
          .then(x=>{setSubscriptions(x.data)})

        
      },[]);


      useEffect(()=>
      {
        //create array of falses the represent the members who clicked on Subscribe for new movie
        let falseArr = []
        members.map(x=> {
          falseArr.push(false)
        })
        setSubClicked(falseArr)
      },[members]) //hook that affected by other hook need to put his get function inside the useeffect []

        // create the watchedMovies array
        useEffect(()=>
        {
          let movArr = []
          subscriptions.forEach((x)=>{
            {
              x.Movies.forEach((y)=>
              {
                movArr.push({movie: y.movieName, id: x.MemberId})
              })
            }
           })
           setWatchedMovies(movArr)
        },[subscriptions])

     
      

      function splitMoviesToMembers(memberId)
      {
        let mWatched = []
         watchedMovies.forEach(movie =>
          {
            if(movie.id == memberId)
            {
              mWatched.push(movie.movie)
            }
          })
          return mWatched
      }
       const openSubscribe = (index) =>
       {
        const updateArray = [...subClicked];
        if(updateArray[index] == false)
         {
          updateArray[index] = true
           setSubClicked(updateArray)
         }
         else
         {
          updateArray[index] = false
          setSubClicked(updateArray)
         }
       }

       const subscriptionItems = (index,item) =>
       {
         return subscriptions.map((item2,index2)=>{
          //  <ul key = {index}>

          if(item._id === item2.MemberId)
          {

            return item2.Movies.map((item3,index3)=>
            {
              return <div key = {index3}>
              <li>{item3.movieName}, {item3.date}</li>
              </div>
            })
          
          }
          // </ul>
         })
       }
      
      let items = members.map((item,index)=>
      {
        let mWatched = []
        return <div key = {index} className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
         <h4>{item.Name}</h4>
         Email: {item.Email}<br/>
         City: {item.City} <br/>
       
         <input type ="button" value = "Edit" />
         <input type ="button" value = "Delete"/>
         <div className="w3-green w3-hover-shadow w3-padding-32 w3-bordered w3-code" style= {{border: "3px solid"}}>
         Movies watched <br/>
         <input type ="button" value = "Subscribe to new movie" onClick = {() => openSubscribe(index)} />

         {(subClicked[index] ? <SubscribeMovie index = {index} item = {item} movies = {splitMoviesToMembers(item._id)}/> : "")}

         <ul>
        {subscriptionItems(index,item)}
        </ul>
         </div>
        </div>
      })

    return(
       <div>
       {items}
       </div>
    ) 
}

export default AllMembers
