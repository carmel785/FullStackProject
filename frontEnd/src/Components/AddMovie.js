import { useForm } from 'react-hook-form';
import { useHistory } from "react-router-dom";
import axios from 'axios'

const AddMovie  = () =>
{
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const history = useHistory();

      const onSubmit = async (data) =>
      {
          let newMovie = {
            Name: data.Name,
            Genres: data.Genres,
            Image: data.Image,
            Premiered: data.Premiered
          }

      axios.post("http://localhost:8000/routingToCinemaWS/addMovie", newMovie)
      .then(resp =>
          {
              console.log(resp.data)
          }).catch((error) =>
          {
              console.log("problem is in add member page")
          })

      history.push("/main/movies/AllMovies")
  }
      
    const handleCancel = () =>
    {
      history.push("/main/movies")
    }

    return(
       <div className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
       <h2>Add New Movie</h2>
       <form onSubmit = {handleSubmit(onSubmit)}>
       Name: <input type = "text" name = "Name" ref={register} /><br/>
       Genres: <input type = "text" name = "Genres" ref={register}/><br/>
       Image url: <input type = "text" name = "Image" ref={register}/><br/>
       Premired: <input type = "date" name = "Premiered" ref={register}/><br/>

       <input type = "submit" value = "Save"/>
       <input type = "button" value = "Cancel" onClick = {handleCancel}/>  
       </form>
       
       </div>
    ) 
}

export default AddMovie
