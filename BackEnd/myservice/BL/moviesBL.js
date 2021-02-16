const Movie = require('../modelsDB/moviesModel')
var moviesDal = require('../Dals/moviesDal')

exports.getAllMovies = function()
{
    return new Promise((resolve,reject) =>
    {
        Movie.find(({}), function(err,movs)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve(movs)
            }           
        })
    })
    
}

exports.addAllMovies = async function()
{
    return new Promise(async function(resolve, reject)
    {
        var movies = await moviesDal.getAllMovies()
        movies.forEach( moviesDB => 
        {
            const m = new Movie({
            Name : moviesDB.name,
            Genres : moviesDB.genres,
            Image : moviesDB.image.medium,
            Premiered : moviesDB.premiered
            })
    
            m.save(function(err)
            {
                if(err)
                {
                    reject(err)
                }
                else
                {
                    resolve('created !')
                }
            })
        })
    })
}

exports.addMovieToDB = function(movie)
{
    return new Promise(function(resolve,reject)
    {
        const m = new Movie({
            Name: movie.Name,
            Genres: movie.Genres,
            Image:  movie.Image,
            Premiered:  movie.Premiered
        })
    
        m.save(function(err)
        {
            if(err)
            {
                reject(err)
            }
            else
            {
                resolve('created')
            }
        })
    })
    
}

exports.editMovieInDB = function(movie,id)
{
    return new Promise(function(resolve,reject)
    {
        // Movie.update({Name: preMovie}
        Movie.findByIdAndUpdate(id
            ,{ 
                Name: movie.Name,
                Genres: movie.Genres,
                Image: movie.Image,
                Premiered: movie.Premiered

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