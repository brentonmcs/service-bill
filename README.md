# Bill - The Synthetic Http Endpoint Monitor

Bill monitors a range of endpoints by querying them with real world transactions.
Status codes and Response times are recorded and returned for Status monitoring tools.

To run with the included examples.

First start up the Fake Service
  cd fakeService
  npm install
  node index.js

Then run the setup (local Redis needs to be running)
  npm install
  node setup.js

Then run Bill from the root directory.
  npm install
  node server.js
