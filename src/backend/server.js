const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(cors());


const citiesAPI = 'https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json';

let cities = []; 

async function fetchCities() {
  try {
    const response = await axios.get(citiesAPI);
    cities = response.data;
  } catch (error) {
    console.error('Error fetching cities:', error);
  }
}

fetchCities();

app.get('/cities', (req, res) => {
  res.json(cities);
});


app.post('/shortest-path', (req, res) => {

  const selectedCity = req.body.selectedCity;
  const startCity = req.body.startingCity;

  if (!cities.find(city => city.name === selectedCity)) {
    res.status(400).json({ error: 'Invalid city selected' });
    return;
  }
   
  // let startCity ="Hyderabad"

  const path = findPath(startCity,selectedCity);

  res.json({ path });
});


function findPath(startCity, selectedCity) {
  const graph = {};
  const distances = {};
  const visited = {};
  const path = [];

  cities.forEach(city => {
    const name = city.name;
    graph[name] = {};
    distances[name] = Infinity;
    visited[name] = false;

    cities.forEach(destination => {
      const destName = destination.name;
      const lat1 = city.lat;
      const lon1 = city.lon;
      const lat2 = destination.lat;
      const lon2 = destination.lon;

      const R = 6371; 
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * (Math.PI / 180)) *
          Math.cos(lat2 * (Math.PI / 180)) *
          Math.sin(dLon / 2) *
          Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;

      graph[name][destName] = distance;
    });
  });

  distances[startCity] = 0;

  for (let i = 0; i < Object.keys(graph).length; i++) {
    const currentCity = minDistance(distances, visited);
    visited[currentCity] = true;

    for (const neighbor in graph[currentCity]) {
      const newDistance = distances[currentCity] + graph[currentCity][neighbor];
      if (newDistance < distances[neighbor]) {
        distances[neighbor] = newDistance;
        path[neighbor] = currentCity;
      }
    }
  }

  const shortestPath = [selectedCity];
  let currentCity = selectedCity;

  while (currentCity !== startCity) {
    currentCity = path[currentCity];
    shortestPath.push(currentCity);
  }

  const coordinates = shortestPath.reverse().map(city => {
    const foundCity = cities.find(c => c.name === city);
    return { lat: foundCity.lat, lon: foundCity.lon };
  });

  return coordinates;
}

function minDistance(distances, visited) {
  let min = Infinity;
  let minCity = null;

  for (const city in distances) {
    if (distances[city] < min && !visited[city]) {
      min = distances[city];
      minCity = city;
    }
  }

  return minCity;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});





































// const express = require('express');
// const axios = require('axios');
// const cors = require('cors'); 
// const app = express();
// const PORT = process.env.PORT || 3002;

// // Middleware to parse JSON
// app.use(express.json());
// app.use(cors());
// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Headers', '*');
//   next();
// });

// app.get('/api/cities', async (req, res) => {
//     try {
//       // Fetch data from the remote URL
//       const response = await axios.get('https://gist.githubusercontent.com/dastagirkhan/00a6f6e32425e0944241/raw/33ca4e2b19695b2b93f490848314268ed5519894/gistfile1.json');
//       // Send the data to the frontend
//       res.json(response.data);
//     } catch (error) {
//       console.error('Error fetching data:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

  
// // Your routes will be added here

// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// // app.get('/api/cities', (req, res) => {
// //     res.json(citiesData);
// //   });


// function findShortestPath(startCity, endCity) {
//   // Create a set to track visited cities
//   const visited = new Set();

//   // // Create an object to store the shortest distances
//   // const distances = {};
//   // for (const city in cityGraph) {
//   //   distances[city] = Infinity;
//   // }
//   distances[startCity] = 0;

//   // Create a priority queue for cities to explore
//   const priorityQueue = [startCity];

//   while (priorityQueue.length > 0) {
//     const currentCity = priorityQueue.shift();
//     visited.add(currentCity);

//     for (const neighbor in cityGraph[currentCity]) {
//       const distanceToNeighbor = cityGraph[currentCity][neighbor];
//       const totalDistance = distances[currentCity] + distanceToNeighbor;

//       if (totalDistance < distances[neighbor]) {
//         distances[neighbor] = totalDistance;
//         priorityQueue.push(neighbor);
//       }
//     }

//     // Sort the priority queue based on distances
//     priorityQueue.sort((a, b) => distances[a] - distances[b]);
//   }

//   // The shortest distance from startCity to endCity
//   const shortestDistance = distances[endCity];

//   // Reconstruct the shortest path
//   const shortestPath = [endCity];
//   let currentCity = endCity;
//   while (currentCity !== startCity) {
//     for (const neighbor in cityGraph[currentCity]) {
//       const distanceToNeighbor = cityGraph[currentCity][neighbor];
//       if (distances[currentCity] === distances[neighbor] + distanceToNeighbor) {
//         shortestPath.unshift(neighbor);
//         currentCity = neighbor;
//         break;
//       }
//     }
//   }

//   return {
//     distance: shortestDistance,
//     path: shortestPath,
//   };
// }


//   // Endpoint to get shortest path
//   app.post('/api/shortest-path', (req, res) => {
//     try {
//       res.json({ message: 'Hello from the server short!' });
//         const selectedCity = req.body.selectedCity;
//         // Implement the logic to find the shortest path based on selectedCity
//         let start="Hyderabad"
//         const shortestPath = findShortestPath(start,selectedCity);
//         res.json({ shortestPath });
//     } catch (error) {
//         console.error('Error processing request:', error);
//         res.status(500).json({ error: 'Internal Server Error' });
//     }
// });