const config = require('config');
const express = require('express');
const mongoose = require('mongoose');

const app = express();

const harnessEnginesDbURI = config.get('mongoURI')+'/'+config.get('harnessEngines');
mongoose.connect(harnessEnginesDbURI)
  .then(() => console.log('Connected to db', harnessEnginesDbURI))
  .catch( err => console.log(`Yak, can\'t connect to ${harnessEnginesDbURI}\n`, err));
 
const engineSchema = new mongoose.Schema({
  "engineId" : { type: String, isRequired: true },
  "engineFactory" : { type: String, isRequired: true },
  "params" : { type: String, isRequired: true }
});

const Engine = mongoose.model('Engine', engineSchema);

async function getEngines(){
  try {
    const engines = await Engine.find();
    console.log('Engines', engines);
    return engines
  } catch(err) {
    console.log('Unable to get Engines from Mongo', err)
  }
}

app.get('/', function (req, res) {
  getEngines()
    .then((e) => {
      res.send(e);
    })
    .catch(err => {
        console.log(err)
    });
})
 
app.listen(3000);