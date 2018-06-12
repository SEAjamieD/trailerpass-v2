const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const API_KEY = "0e2fdf4b7171df90e3dbc0718f45191b";

// Put all API endpoints under here
app.get('/api/popular-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=en-US&region=us&page=1`)
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

app.get('/api/movie/:id', (req, res) => {
  fetch(`https://api.themoviedb.org/3/movie/${req.params.id}?api_key=${API_KEY}&append_to_response=videos`)
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

// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname+'/client/build/index.html'));
});

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Server listening on ${port}`);
