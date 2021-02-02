import { useForm } from 'react-hook-form';
import axios from 'axios'
import {useState} from 'react'
import { useHistory } from "react-router-dom";

const CreateAccount  = () =>
{
    let history = useHistory();
    const { register, handleSubmit, errors } = useForm(); // initialize the hook
    const [user, setUser] = useState([])

    const onSubmit = async function(data)
    {
        let users = await axios.get('http://localhost:4000/routingToFront/UsersDB')
        // users.data.forEach(x=> console.log(x.userName))
        var userData = users.data.filter(u => u.User === data.user)
        if(userData === "")
        {
            console.log("this user is not exiest")
            history.push("/noUser");
        }
        else
        {
            userData.forEach(x=>
                {
                    if(x.Password === "")
                    {
                        let user = {_id: x._id , User : x.User , Password : data.pwd}
                        axios.put('http://localhost:4000/routingToFront/UsersDB/:'+x._id, user)
                            .then(resp => console.log(resp.data))
                        history.push("/");
                    }
                    else if(x.Password === data.pwd)
                    {
                        console.log("this user found in the DataBase, redirecting to Login Page..")
                        history.push("/");
                    }
                    else
                    {
                        console.log("this user is not exiest")
                        history.push("/noUser");
                    }
                })
        }
    }
    return(
        <div>
            <h3> Create an Account</h3>
            <form onSubmit = {handleSubmit(onSubmit)}>
            User Name: <input name = "user" ref = {register} /><br/>
            Password: <input name="pwd" ref={register}/><br/>
            <input type = "submit" value = "Create" /><br/>
            </form>
        </div>
    ) 
}

export default CreateAccount
