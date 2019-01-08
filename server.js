require('dotenv').config();
const express = require('express');
const path = require('path');
const fetch = require('node-fetch');

const app = express();

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

const date = new Date();
const year = date.getFullYear();
const month = date.getMonth() + 1;
const today = date.getDate();
const tomorrow = today + 1;

function plus2(month) {
  var plus2 = month + 2;
  if (plus2 > 12) {
    plus2 = plus2 - 12;
  }
  return plus2;
}

const twoMonthsOut = plus2(month);

// Put all API endpoints under here
//home screen movies list route

//trending movies
app.get('/api/trending-movies', (req, res) => {

  fetch(`https://api.themoviedb.org/3/trending/movie/week?api_key=${process.env.OPENDB_KEY}`)
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

app.get('/api/coming-soon-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.OPENDB_KEY}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_date.gte=${year}-${month}-${tomorrow}&primary_release_date.lte=2019-${twoMonthsOut}-${tomorrow}`)
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

//action movies
app.get('/api/action-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.OPENDB_KEY}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=${year}&with_genres=28%2C%2012`)
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

app.get('/api/in-theaters-movies', (req, res) => {
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

//comedy
app.get('/api/comedy-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.OPENDB_KEY}&language=en-US&region=us&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&primary_release_year=2019&with_genres=35`)
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

//kids
app.get('/api/kids-movies', (req, res) => {
  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${process.env.OPENDB_KEY}&language=en-US&region=US&sort_by=popularity.desc&certification_country=US&certification.lte=G%2CPG%2CPG13&include_adult=false&include_video=false&page=1&primary_release_date.gte=2018-9-${tomorrow}&primary_release_date.lte=2019-${twoMonthsOut}-${tomorrow}&with_genres=10751`)
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

// person details route
app.get('/api/person/:person_id', (req, res) => {
  fetch(`https://api.themoviedb.org/3/person/${req.params.person_id}?api_key=${process.env.OPENDB_KEY}&language=en-US&append_to_response=combined_credits`)
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
