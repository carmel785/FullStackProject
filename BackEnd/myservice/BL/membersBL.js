const Member = require('../modelsDB/membersModel')
var membersDal = require('../Dals/membersDal')

exports.addAllMembers = async function()
{
    return new Promise(async function(resolve, reject)
    {
        var members = await membersDal.getAllMembers()
        members.forEach( membersDB => 
        {
            const m = new Member({
            Name : membersDB.name,
            Email : membersDB.email,
            City : membersDB.address.city
            })
    
            m.save(function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('All the Members from the cloud Data copied to DB !')
                }
            })
        })
    })
}

exports.getAllMembers = function()
{
    return new Promise((resolve,reject) =>
    {
        Member.find(({}), function(err,mems)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(mems)
            }           
        })
    })
    
}
//Edit Member
// exports.editMemberInDB = function(memberName,email,city,preName)
exports.editMemberInDB = function(newMember, id)
{
    return new Promise(function(resolve,reject)
    {
        //Member.update({Name: preName}
        Member.findByIdAndUpdate(id
            ,{
                Name: newMember.Name,
                Email: newMember.Email,
                City: newMember.City
             },function(err,m)
                {
                    if(err)
                    {
                        reject(err)
                    }
                    else
                    {
                        resolve(m)
                    }
                })
    })
}
//Delete Member
exports.deleteMemberInDB = function(id)
{
    return new Promise(function(resolve,reject)
    {
        // Member.findOneAndDelete({Name: memberName}
            Member.findByIdAndDelete(id
            ,function(err)
                {
                    if(err)
                    {
                        reject(err)
                    }
                    else
                    {
                        resolve("Member Deleted")
                    }
                })
    })
}

//Add Member in DB
exports.addMember = async function(name,email,city)
{
    return new Promise(async function(resolve, reject)
    {
        const m = new Member({
        Name : name,
        Email : email,
        City : city
        })
    
        m.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('Member created !')
            }
        })
       
    })
}