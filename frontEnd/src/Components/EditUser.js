import axios from 'axios'
import {useRef, useContext, useEffect} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory
  } from "react-router-dom";
import { useForm } from 'react-hook-form';
import {UserContext} from './UserContext'

const EditUser = () =>
{
    const {name} = useParams()
    const checkboxSub = useRef(null);
    const checkboxMov = useRef(null);
    let history = useHistory();
    const { register , handleSubmit, errors } = useForm(); // initialize the hook
    const context = useContext(UserContext)

    useEffect(()=> {
        console.log("EditUser: "+context)
    },[])


    function subFunc(checked) {
        if(checked === true)
        {
            checkboxSub.current.checked = true
        }
    }
    function movFunc(checked) {
        if(checked === true)
        {
            checkboxMov.current.checked = true
        }
    }

    const onSubmit = (data) =>
    {
        console.log(data)
        history.push({pathname: "/main/manageUsers/users",state: data})
    }

    return(
    <div className="w3-container">
    <h1>Users</h1>
    <h2>Edit User: {name}</h2>
        <div className ="w3-blue w3-padding-32 w3-bordered w3-code">
            <form onSubmit = {handleSubmit(onSubmit)}>
                First Name: <input type = "text" name= "fname" ref = {register}/><br/>
                Last Name: <input type = "text" name= "lname" ref = {register} /><br/>
                User Name: <input type = "text" name= "user" ref = {register}/><br/>
                Session Time Out(Minutes): <input type = "text" name= "sessionTimeOut" ref = {register}/><br/>
                Created Date: <input type = "date" name= "createdDate" ref = {register}/><br/>
                Permissons : <br/>
                <input type = "checkbox" name = "ViewS" id = "ViewS" ref={checkboxSub} /> View Subscriptions <br/>
                <input type = "checkbox" name = "createS" id = "createS" ref = {register} onChange= {(e)=> subFunc(e.target.checked)}/> Create Subscriptions <br/> 
                <input type = "checkbox" name = "deleteS" id = "deleteS" ref = {register} onChange= {(e)=> subFunc(e.target.checked)} /> Delete Subscriptions <br/>
                <input type = "checkbox" name = "updateS" id = "updateS" ref = {register} onChange= {(e)=> subFunc(e.target.checked)}/> Update Subscription <br/>
                <input type = "checkbox" name = "viewM" id = "viewM" ref={checkboxMov}/> View Movies <br/> 
                <input type = "checkbox" name = "createM" id = "createM" ref = {register} onChange= {(e)=> movFunc(e.target.checked)}/> Create Movies <br/>
                <input type = "checkbox" name = "deleteM" id = "deleteM" ref = {register} onChange= {(e)=> movFunc(e.target.checked)}/> Delete Movies <br/>
                <input type = "checkbox" name = "updateM" id = "updateM" ref = {register} onChange= {(e)=> movFunc(e.target.checked)}/> Update Movie <br/><br/> 
                <input type = "submit" value = "Update"/>
                <input type = "button" value = "Cancel" onClick = {() => history.goBack()}/>
            </form>
        </div>
    </div>
    )
}     
export default EditUser