import axios from 'axios'
import {UserContext} from './Contexts'
import {useContext, useEffect, useState} from 'react'
import SubscribeMovie from "./SubscribeMovie"
const AllMembers  = () =>
{

    const [members,setMembers] = useState([])
    const [movies,setMovie] = useState({})
    const [subClicked, setSubClicked] = useState([])


    const context = useContext(UserContext)
   
    useEffect(() => {
        console.log("All Members: "+context)

        //getting the members from the Web Service
        axios.get('http://localhost:4000/routingToFront/membersToClient')
          .then(x=>{setMembers(x.data)})
         
        //create array of falses the represent the members who clicked on Subscribe for new movie
        let arr = []
        members.map(x=> {
          arr.push(false)
        })
        setSubClicked(arr)
        
      },[]);
      
      // const showSubscribe = () =>
      // {
      //   // // console.log(subscribeMovie)
      //   // if(subscribeMovie === true)
      //   // {
      //   //   return <div className="w3-red w3-hover-shadow w3-padding-32 w3-bordered w3-code">
      //   //   Add new Movie
      //   //   <ul>
      //   //     <li>movies</li>
      //   //   </ul>
      //   // </div>
      //   // }

      // }

      //adding the index value to the array of members who open the subscribe button
      const Aaa = (index) =>
      {
          // console.log(index)
          let arr = subClicked
          arr.push(index)
          setSubClicked(arr)
          console.log(subClicked)
          // console.log(subClicked)
      }

       const openSubscribe = (index, item) =>
       {
         setMovie("a")
        //  var arr = subClicked
        //  console.log(subClicked[index])
        //  if(arr[index] == false)
        if(subClicked[index] == false)
         {
          subClicked[index] = true
           setSubClicked(subClicked)
         }
         else
         {
          subClicked[index] = false
          setSubClicked(subClicked)
         }
         console.log(subClicked)
       }

       const subscribeVisible = (index) =>
       {
          let arr = subClicked
          // console.log(arr)
          // return arr[index]
          return arr[index]
       }

      let items = members.map((item,index)=>
      {
        return <div key = {index} className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
         <h4>{item.Name}</h4>
         Email: {item.Email}<br/>
         City: {item.City} <br/>
         <input type ="button" value = "Edit" />
         <input type ="button" value = "Delete"/>
         <div className="w3-green w3-hover-shadow w3-padding-32 w3-bordered w3-code" style= {{border: "3px solid"}}>
         Movies watched <br/>
         <input type ="button" value = "Subscribe to new movie" onClick = {() => openSubscribe(index)} />
        <SubscribeMovie index = {index} item = {item} />

         </div>
        </div>
      })


    return(
       <div>
       {items}
       </div>
    ) 

      

      // const addItem = () =>{
      //   setItem([...item,{id: item.length}])
      // }

    // return(
    //   <div>
    //     <button onClick = {addItem}>Add number</button>
    //     <ul>
    //       {item.map(item => (
    //         <li key = {item.id} >{item.id}</li>
    //       ))}
    //     </ul>
    //   </div>
    // )
}

export default AllMembers
