var usersDal = require('../dals/usersDal')
var permissionsDal = require('../dals/permissionsDal')
var User = require('../modelsDB/usersModel')

// exports.addUserToJson = async function(fname,lname,sessionTimeOut)
// {
//     return new Promise(async function(resolve, reject)
//     {
//         var today = new Date();
//         var dd = today.getDate();
//         var mm = today.getMonth()+1; 
//         var yyyy = today.getFullYear();
//         var users = await usersDal.readFile()
//         if(users  == "empty")
//         {
//             var obj = [{
//                 id : 0,
//                 firstName: fname,
//                 lastName: lname,
//                 created_date: dd+"/"+mm+"/"+yyyy,
//                 duration: sessionTimeOut
//             }]
//             await usersDal.writeFile(obj)
//             resolve("added to json")
//         }
//         else
//         {
//             var newId = users.length
//             if(newId == 1)
//                 {
//                     newId = 1
//                 }
//             else
//             {
//                 newId = users.length
//             }
//             var obj = {
//                 id : newId,
//                 firstName: fname,
//                 lastName: lname,
//                 created_date: dd+"/"+mm+"/"+yyyy,
//                 duration: sessionTimeOut
//             }
//             users.push(obj)
//             await usersDal.writeFile(users)
//             resolve("added to json")
//         }
//         console.log(users)
//     })
// }

// exports.addPermissionsToJson = async function(data)
// {
//     return new Promise(async function(resolve, reject)
//     {
//         var permissionsArry =  makePremissionsText(data)
//         var users = await permissionsDal.readFile()
//         if(users  == "empty")
//         {
//             var obj = [{
//                 id : 0,
//                 user : data.user,
//                 permissions : permissionsArry
//             }]
//             await permissionsDal.writeFile(obj)
//             resolve("added to json")
//         }
//         else
//         {
//             var newId = users.length
//             if(newId == 1)
//                 {
//                     newId = 1
//                 }
//             else
//             {
//                 newId = users.length
//             }
//             var obj = {
//                 id : newId,
//                 user : data.user,
//                 permissions : permissionsArry

//                 //data.ViewS, data.createS, data.deleteS, 
//                 //data.updateS, data.viewM, data.createM, data.deleteM, data.updateM
//             }
//             users.push(obj)
//             await permissionsDal.writeFile(users)
//             resolve("added to json")
//         }
//         // console.log(users)
        
//     })
// }

// exports.addUserToDB = async function(user)
// {
//     return new Promise(async function(resolve,reject)
//     {
//         const u = new User({
//             User : user,
//             Password : ""
//         })
//         u.save(function(err)
//         {
//             if(err)
//             {
//                 reject(err)
//             }
//             else
//             {
//                 resolve("created")
//             }
//         })
//     })
// }



// exports.deleteUser = async function(user)
// {
//     return new Promise(async function(resolve,reject)
//     {
//         User.findOneAndDelete({User: user}, function(err)
//         {
//             if(err)
//             {
//                 reject(err)
//             }
//             else
//             {
//                 resolve("deleted")
//             }
//         })

//         var users = await usersDal.readFile()
//         var pers = await permissionsDal.readFile()
//         let userID = pers.findIndex(x=> 
//             {
//                 if(user == x.User)
//                 {
//                     return x.id
//                 }
//             })
//         pers.splice(userID,1)
//         users.splice(userID,1)
//         await usersDal.writeFile(users)
//         await permissionsDal.writeFile(pers)
//     })
// }

// exports.updateUser = async function(data, user)
// {
//     var permissionsArry =  makePremissionsText(data)
//     var today = new Date();
//     var dd = today.getDate();
//     var mm = today.getMonth()+1; 
//     var yyyy = today.getFullYear();

//     //update DB
//     User.update({User: user},{User: data.user},(err,u)=>
//     {
//        if(err)
//        {
//            reject(err)
//        }
//     })

    
//     //update Permissions json
//     let permissions = await permissionsDal.readFile()
//     let indexP = permissions.findIndex(p=>p.user == user)
//     if(indexP>=0)
//     {
//         permissions[indexP] = {
//             id: indexP,
//             user: data.user,
//             permissions: permissionsArry
//         }
        
//         await permissionsDal.writeFile(permissions)
//     }

//     // //update Users json
//     let users = await usersDal.readFile()
//     if(indexP>=0)
//     {
//         users[indexP] = {
//             id: indexP,
//             firstName: data.fname,
//             lastName: data.lname,
//             created_date: dd+"/"+mm+"/"+yyyy,
//             duration: data.sessionTimeOut
//         }
//         await usersDal.writeFile(users)
//     }

// }

//making premissions array from all the data it get 
// function makePremissionsText(data)
// {
//     var arr = []
//     if(data.ViewS == "on")
//     {
//         arr.push("View Subscriptions")
//     }
//     if(data.createS == "on")
//     {
//        arr.push("Create Subscriptions")
//     }
//     if(data.deleteS == "on")
//     {
//         arr.push("Delete Subscriptions")
//     }
//     if(data.updateS == "on")
//     {
//         arr.push("Update Subscription")
//     }
//     if(data.viewM == "on")
//     {
//         arr.push("View Movies")
//     }
//     if(data.createM == "on")
//     {
//         arr.push("Create Movies")
//     }
//     if(data.deleteM == "on")
//     {
//         arr.push("Delete Movies")
//     }
//     if(data.updateM == "on")
//     {
//         arr.push("Update Movie")
//     }
//     // var arr = [viewS,createS,deleteS,updateS, viewM, createM, deleteM, updateM]
//     return arr
// }

/////////////////////////////////////////////////////////////
//FUNCTION THAT I USED

exports.getUsersFromDB = async function()
{
    return new Promise (async function(resolve,reject)
    {
        User.find({}, function(err,users)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(users)
            }
        })
    })
    
}

exports.updateUser = async function(user)
{
    var users = await getAllUserDetailsNoExport()
    // console.log(user)
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; 
    var yyyy = today.getFullYear();

    if(user.fname != undefined) // if the user updated fron EditUser component
    {
        //update Permissions json
        let permissions = makePremissionsText(user)
        let permissionsFile = await permissionsDal.readFile()
        let indexP = permissionsFile.findIndex(p=>p.user == user.prevUser)
        if(indexP>=0)
        {
            permissionsFile[indexP] = {
                id: indexP,
                user: user.User,
                permissions: permissions
            }
            
            await permissionsDal.writeFile(permissionsFile)
        }

        //update Users json
        let users = await usersDal.readFile()
        if(indexP>=0)
        {
            users[indexP] = {
                id: indexP,
                firstName: user.fname,
                lastName: user.lname,
                created_date: dd+"/"+mm+"/"+yyyy,
                duration: user.sessionTimeOut
            }
            await usersDal.writeFile(users)
        }

    }

    //update DB
    return new Promise( function(resolve,reject)
    {
        User.update({_id: user._id},{User: user.User, Password: user.Password },(err,u)=>
        {
           if(err)
           {
               reject(err)
           }
           else
           {
               resolve(u)
           }
        })
    
    })
    
}

async function getAllUserDetailsNoExport()
{
    return new Promise (async function(resolve,reject)
    {
        var user = await usersDal.readFile()
        var permission = await permissionsDal.readFile()
        var details = []
        if(user!= "empty" && permission!= "empty")
        {
            for(let i = 0; i<= user.length-1; i++)
            {
                // console.log(user[i].firstName+ " "+ user[i].lastName)
                // console.log(permission[i].user)
                details.push({
                    fullName : user[i].firstName+ " "+ user[i].lastName,
                    userName : permission[i].user,
                    sessionTimeOut : user[i].duration,
                    created_date : user[i].created_date,
                    permissions : permission[i].permissions
                })
            }
        }
       
        // console.log(details)
        resolve(details)
    })
    
}
exports.getAllUserDetails = async function()
{
    return new Promise (async function(resolve,reject)
    {
        var user = await usersDal.readFile()
        var permission = await permissionsDal.readFile()
        var details = []
        if(user!= "empty" && permission!= "empty")
        {
            for(let i = 0; i<= user.length-1; i++)
            {
                // console.log(user[i].firstName+ " "+ user[i].lastName)
                // console.log(permission[i].user)
                details.push({
                    fullName : user[i].firstName+ " "+ user[i].lastName,
                    userName : permission[i].user,
                    sessionTimeOut : user[i].duration,
                    created_date : user[i].created_date,
                    permissions : permission[i].permissions
                })
            }
        }
       
        // console.log(details)
        resolve(details)
    })
    
}

//making premissions array from all the data it get 
function makePremissionsText(data)
{
    var arr = []
    let subscriptionsFlag = false
    let moviesFlag = false
   
    if(data.createS == true)
    {
        subscriptionsFlag = true
        arr.push("Create Subscriptions")
    }
    if(data.deleteS == true)
    {
        subscriptionsFlag = true
        arr.push("Delete Subscriptions")
    }
    if(data.updateS == true)
    {
        subscriptionsFlag = true
        arr.push("Update Subscription")
    }
   
    if(data.createM == true)
    {
        moviesFlag = true
        arr.push("Create Movies")
    }
    if(data.deleteM == true)
    {
        moviesFlag = true
        arr.push("Delete Movies")
    }
    if(data.updateM == true)
    {
        moviesFlag = true
        arr.push("Update Movie")
    }

    if(subscriptionsFlag == true )
    {
        arr.push("View Subscriptions")
    }
    if(moviesFlag == true)
    {
        arr.push("View Movies")
    }
    // var arr = [viewS,createS,deleteS,updateS, viewM, createM, deleteM, updateM]
    return arr
}

exports.deleteUser = async function(user)
{
    // return new Promise(async function(resolve,reject)
    // {
        User.findOneAndDelete({User: user}, function(err)
        {
            if(err)
            {
                // reject(err)
                console.log(err)
            }
            else
            {
                // resolve("deleted")
                console.log("Deleted")
            }
        })

        var users = await usersDal.readFile()
        var pers = await permissionsDal.readFile()
        let userID = pers.findIndex(x=> 
            {
                if(user == x.User)
                {
                    return x.id
                }
            })
        pers.splice(userID,1)
        users.splice(userID,1)
        await usersDal.writeFile(users)
        await permissionsDal.writeFile(pers)
    // })
}

exports.addUser = async function(userData)
{
    //adding new user data to DB
    addUserToDB(userData.user)

    //adding new user to users json
    addUserToJson(userData.fname,userData.lname,userData.sessionTimeOut)

    //adding new user to permissions json
    addPermissionsToJson(userData)
}


async function addUserToJson(fname,lname,sessionTimeOut)
{
    return new Promise(async function(resolve, reject)
    {
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; 
        var yyyy = today.getFullYear();
        var users = await usersDal.readFile()
        if(users  == "empty")
        {
            var obj = [{
                id : 0,
                firstName: fname,
                lastName: lname,
                created_date: dd+"/"+mm+"/"+yyyy,
                duration: sessionTimeOut
            }]
            await usersDal.writeFile(obj)
            resolve("added to json")
        }
        else
        {
            var newId = users.length
            if(newId == 1)
                {
                    newId = 1
                }
            else
            {
                newId = users.length
            }
            var obj = {
                id : newId,
                firstName: fname,
                lastName: lname,
                created_date: dd+"/"+mm+"/"+yyyy,
                duration: sessionTimeOut
            }
            users.push(obj)
            await usersDal.writeFile(users)
            resolve("added to json")
        }
        console.log(users)
    })
}

async function addPermissionsToJson(data)
{
        var permissionsArry =  makePremissionsText(data)
        var users = await permissionsDal.readFile()
        if(users  == "empty")
        {
            var obj = [{
                id : 0,
                user : data.user,
                permissions : permissionsArry
            }]
            await permissionsDal.writeFile(obj)
            console.log("added to json")
        }
        else
        {
            var newId = users.length
            if(newId == 1)
                {
                    newId = 1
                }
            else
            {
                newId = users.length
            }
            var obj = {
                id : newId,
                user : data.user,
                permissions : permissionsArry

                //data.ViewS, data.createS, data.deleteS, 
                //data.updateS, data.viewM, data.createM, data.deleteM, data.updateM
            }
            users.push(obj)
            await permissionsDal.writeFile(users)
            console.log("added to json")
        }
        // console.log(users)
}

async function addUserToDB(user)
{
    const u = new User({
        User : user,
        Password : ""
    })
    u.save(function(err)
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            console.log("created")
        }
    })
}