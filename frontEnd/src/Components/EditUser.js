import {useRef, useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    useParams,
    useHistory
  } from "react-router-dom";
import { useForm } from 'react-hook-form';

const EditUser = () =>
{
    const {name,userName} = useParams()
    const checkboxSub = useRef(null);
    const checkboxMov = useRef(null);
    let history = useHistory();
    const [date, setDate] = useState("")
    const { register , handleSubmit, errors } = useForm(); // initialize the hook

    useEffect(()=> {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        setDate(dd+"/"+mm+"/"+yyyy)
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
        let newArr = {
            prevUser: userName,
            fname: data.fname,
            lname: data.lname,
            user: data.user,
            sessionTimeOut: data.sessionTimeOut,
            createM: data.createM,
            createS: data.createS,
            deleteM: data.deleteM,
            deleteS: data.deleteS,
            updateM: data.updateM,
            updateS: data.updateS,
            // created_date: date
        }
        history.push({pathname: "/main/manageUsers/users",state: newArr})
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
                Created Date: {date} <br/>
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