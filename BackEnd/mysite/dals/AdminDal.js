var jsonfile = require('jsonfile')

exports.readFile = function()
{
    return new Promise(function(resolve,reject) {
        jsonfile.readFile("jsonFiles/Admin.json", function(err,data)
        {
            if(err)
            {
                if(data == undefined)
                {
                    resolve("empty")
                }
                else
                {
                    reject(err)
                }
            }
            else
            {
                resolve(data)
            }    
        })
    })
    
}