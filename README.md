# hwmap - City Path Finder

Finds and visualizes the shortest driving path between Indian cities on a Google Map.

## What it does

- React frontend lets you pick a starting city and a destination city from a list (`CityList`)
- On selection, it calls an Express backend which runs a Dijkstra's-algorithm shortest-path search (`findPath` in `src/backend/server.js`) over a city graph
- City data is fetched at backend startup from a public gist (lat/lon coordinates)
- The result path is rendered on a Google Map (`Map.js`) as a polyline, and turn-by-turn directions are requested via the Google Maps Directions API and rendered with `DirectionsRenderer`

## Tech stack

**Frontend** (`src/`): React 18, Create React App, axios, Google Maps JavaScript API (loaded via script tag)

**Backend** (`src/backend/`): Node.js, Express, body-parser, cors, axios (fetches city data from a remote gist)

## Getting started

Backend:
```bash
cd src/backend
npm install
node server.js   # listens on port 5000
```

Frontend:
```bash
npm install
npm start         # listens on port 3000, calls backend at localhost:5000
```

Note: `Map.js` has a Google Maps API key hardcoded in the source — replace it with your own key before deploying.
