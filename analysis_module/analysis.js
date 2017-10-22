#! /usr/bin/env node

function analyzeSentences (auth_fp, file) {
  // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');

  // Instantiates a client
  const language = Language({
    keyFilename: auth_fp
  });

  // Reading in file
  console.log('Reading Files...');
  var fs = require('fs');
  var contents = fs.readFileSync(file);
  var jsonContent = JSON.parse(contents);
  var new_file = require(file);

  const document = {
    'content': jsonContent.review,
    type: 'PLAIN_TEXT'
  };

  // Detects the sentiment of the document
  //TODO: implement hashID's for each of the sentences

  console.log('Starting Analysis...')

  language.analyzeSentiment({ document: document })
    .then((results) => {
      //[START analyzeSentiment]
      const sentiment = results[0].documentSentiment;
      new_file.reviewScore = sentiment.score
      fs.writeFileSync(file, JSON.stringify(new_file, null, 2));
      new_file.reviewMagnitude = sentiment.magnitude
      fs.writeFileSync(file, JSON.stringify(new_file, null, 2));
      var sent_arr = [];
      console.log(`Document sentiment:`);
      console.log(`  Score: ${sentiment.score}`);
      console.log(`  Magnitude: ${sentiment.magnitude}`);
      const sentences = results[0].sentences;

      sentences.forEach((sentence) => {
        sent_arr.push({
          Sentence: sentence.text.content,
          Score: sentence.sentiment.score,
          Magnitude: sentence.sentiment.magnitude
        });
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`  Score: ${sentence.sentiment.score}`);
        console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
      });
      new_file.sentences = sent_arr;
      fs.writeFileSync(file, JSON.stringify(new_file, null, 2));
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
    //[END analyzeSentiment]
}

function analyzeEntitySentimentOfText (auth_fp, file) {
    // [START language_entity_sentiment_string]
    const Language = require('@google-cloud/language');
    const language = Language({
      keyFilename: auth_fp
    });

    // Reading in file
    console.log('Reading Files...');
    var fs = require('fs');
    var contents = fs.readFileSync(file);
    var jsonContent = JSON.parse(contents);
    var new_file = require(file);
    var entity_arr = [];

    jsonContent.sentences.forEach((sentence) => {
      var sent = sentence["Sentence"];
      const request = {
        document: {
          "content": JSON.stringify(sent),
          "type": 'PLAIN_TEXT'
        }
      };
      var sent_dict = []
      language.analyzeEntitySentiment(request)
        .then((results) => {
          const entities = results[0].entities;
          console.log(`Entities and sentiments:`);
          if(entities[0] != undefined) {
            entities.forEach((entity) => {
              console.log(`  Name: ${entity.name}`);
              console.log(`  Type: ${entity.type}`);
              console.log(`  Score: ${entity.sentiment.score}`);
              console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
              sent_dict.push({
                Name: entity.name,
                Type: entity.type,
                Score: entity.sentiment.score,
                Magnitude: entity.sentiment.magnitude
              });
              console.log(sent_dict);
            });
          }
        }).catch((err) => {
          console.error('ERROR:', err);
        });
        entity_arr.push(sent_dict);
    })

    new_file.entities = entity_arr;
    fs.writeFileSync(file, JSON.stringify(new_file, null, 2));

    // [END language_entity_sentiment_string]
  }

// Main function, arguments require a relative filepath to the authentication api JSON key
// Also requires the absolute filepath to the json file to be read
const argv = require('yargs').argv;

if (argv.auth_fp && argv.file && argv.sentence) {
  analyzeSentences(argv.auth_fp, argv.file);
} else if (argv.auth_fp && argv.file && argv.entity) {
  analyzeSentences(argv.auth_fp, argv.file);
  analyzeEntitySentimentOfText(argv.auth_fp, argv.file);
}
