import { useForm } from 'react-hook-form';
import { useHistory,useParams } from "react-router-dom";
import axios from 'axios'

const EditMember  = () =>
{
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const history = useHistory();
    const {id,name} = useParams()

      const onSubmit = async (data) =>
      {
        let newMember = {
          Name: data.Name,
          Email: data.Email,
          City: data.City,
        }
        
      axios.put('http://localhost:8000/routingToCinemaWS/editMember/'+id, newMember)
      .then(resp =>
          {
              console.log(resp.data)
          }).catch((error) =>
          {
              console.log("problem is in Edit member page")
          })

      history.push("/main/Subscriptions/AllMembers")
  }
      
    const handleCancel = () =>
    {
      history.goBack()
    }

    return(
       <div className="w3-blue w3-hover-shadow w3-padding-32 w3-bordered w3-code">
       <h2>Edit Member: {name}</h2>
       <form onSubmit = {handleSubmit(onSubmit)}>
       Name: <input type = "text" name = "Name" ref={register} /><br/>
       Email: <input type = "text" name = "Email" ref={register}/><br/>
       City: <input type = "text" name = "City" ref={register}/><br/>
       <input type = "submit" value = "Update"/>
       <input type = "button" value = "Cancel" onClick = {handleCancel}/>  
       </form>
       
       </div>
    ) 
}

export default EditMember
