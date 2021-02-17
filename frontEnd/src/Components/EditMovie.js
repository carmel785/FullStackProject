import { useForm } from 'react-hook-form';
import { useHistory, useParams } from "react-router-dom";
import axios from 'axios'

const EditMovie  = () =>
{
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const history = useHistory();
    const {id,name} = useParams()

      const onSubmit = async (data) =>
      {
          let newMovie = {
            Name: data.Name,
            Genres: data.Genres,
            Image: data.Image,
            Premiered: data.Premiered
          }

      axios.put("http://localhost:8000/routingToCinemaWS/editMovie/"+id, newMovie)
      .then(resp =>
          {
              console.log(resp.data)
          }).catch((error) =>
          {
              console.log("problem is in edit member page")
          })

      history.push("/main/movies/AllMovies")
  }
      
    const handleCancel = () =>
    {
      history.push("/main/movies/AllMovies")
    }

    
    return(
       <div className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
       <h2>Edit Movie {name}</h2>
       <form onSubmit = {handleSubmit(onSubmit)}>
       Name: <input type = "text" name = "Name" ref={register} /><br/>
       Genres: <input type = "text" name = "Genres" ref={register}/><br/>
       Image url: <input type = "text" name = "Image" ref={register}/><br/>
       Premired: <input type = "date" name = "Premiered" ref={register}/><br/>

       <input type = "submit" value = "Update"/>
       <input type = "button" value = "Cancel" onClick = {handleCancel}/>  
       </form>
       
       </div>
    ) 
}

export default EditMovie
