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
        var userData = users.data.filter(u => u.User == data.user)
        if(userData == "")
        {
            console.log("this user is not exiest")
            history.push("/noUser");
        }
        else
        {
          userData.forEach(x=> {
            if(x.Password == data.pwd)
            {
              console.log("Loggin in..")
              history.push({pathname: "/main",state: x.User});
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
