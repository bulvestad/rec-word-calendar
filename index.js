const express = require('express');
const Podlet = require('@podium/podlet');

const app = express();

const podlet = new Podlet({
  name: 'rec-word-clock', // required
  version: '1.0.0', // required
  pathname: '/', // required
  development: true,
});

app.use(podlet.middleware());

app.get(podlet.manifest(), (req, res) => {
  res.status(200).send(podlet);
});

app.get(podlet.content(), (req, res) => {

  res.podiumSend(
      `<div>
        <h1>Title</h1>
        <p>Hola sweet Julian! </p>
    </div>`
  );
});

app.listen(7100);
