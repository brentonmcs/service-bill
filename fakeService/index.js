(function () {
  var app = require('express')();

  app.get('/Account', function (req, res) {
    res.send({
      name : "Test Bob",
      email : "test@bob.com",
      address : {
        street1 : "1 main street",
        state : "NSW",
        postcode: "2000"
      }
    });
  });

  app.post('/Account', function (req, res) {
    console.log(req.headers);

    if (!req.headers.channel) {
      res.status(400);
      res.send('None shall pass');
    } else {
      res.send('Hello World!');
    }
  });

  app.get('/History', function (req, res) {
    res.send('Hello World!');
  });

  app.listen(3001);
})();
