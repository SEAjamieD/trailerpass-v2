require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

// Put all API endpoints under here

//home screen movies list route
app.get('/api/popular-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.OPENDB_KEY}&language=en-US&region=us&page=1`)
    .then(response => {
      return response.json()
    .then(json => {
      return response.ok ? json : Promise.reject(json)
      });
    })
    .then((data) => {
      res.json(data);
    })
    .catch((error) => {
      console.log(error)
    })
})

// movie details route
app.get('/api/movie/:id', (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${process.env.OPENDB_KEY}&append_to_response=videos,credits`)
  .then(response => {
    return response.json()
  .then(json => {
    return response.ok ? json : Promise.reject(json);
    });
  })
  .then((data) => {
    res.json(data);
  })
})

//search route
app.get('/api/search/:query', (req, res) => {
  fetch(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.OPENDB_KEY}&language=en-US&query=${req.params.query}&page=1&include_adult=false&region=en-US`)
  .then(response => {
    return response.json()
    .then(json => {
      return response.ok ? json : Promise.reject(json);
    });
  })
  .then((data) => {
    res.json(data)
  })
  .catch((error) => {
    console.log(error)
  })
})

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
