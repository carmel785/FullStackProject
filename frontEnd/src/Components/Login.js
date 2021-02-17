import {BrowserRouter as Router,Link, Switch, Route} from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Login  = () =>
{
  const { register, handleSubmit, errors } = useForm(); // initialize the hook
  let history = useHistory();

    const onSubmit = async (data) =>
    {
      let users = await axios.get('http://localhost:4000/routingToFront/UsersDB')
      var userData = users.data.filter(u => u.User === data.user)
        if(typeof(userData)[0] === "undefined") //for any other option then a user
        {
            console.log("this user is not exist")
            history.push("/noUser");
        }
        else
        {
          userData.forEach(x=> {
            if(x.Password === data.pwd)
            {
              console.log("Loggin in..")
              sessionStorage["user"] = x.User
              history.push("/main");
            }
            else
            {
              console.log("this user is not exist")
              history.push("/noUser");
            }
          })          
        }
    }

    return(
        <div>
            <h3>Log in Page</h3>
            <form onSubmit = {handleSubmit(onSubmit)}>
              User Name: <input name ="user" ref={register}/><br/>
              Password: <input name="pwd" ref={register}/><br/>
            <input type = "submit" value = "Login" /><br/>
            <Link to = "/createAccount" >Create Account</Link>
            
            </form>
        </div>
    ) 
}

export default Login
