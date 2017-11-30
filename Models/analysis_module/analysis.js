#! /usr/bin/env node
exports.analyze = analyze;

function analyze (json, cb) {
    // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');
  
    // Instantiates a client
    var auth = "./Models/analysis_module/gcloud_auth_key.json"
    const language = Language({
      keyFilename: auth
    });
  
    const document = {
      'content': json.review,
      type: 'PLAIN_TEXT'
    };
  
    language.analyzeSentiment({ document: document })
      .then((results) => {
        const sentiment = results[0].documentSentiment;
        json.reviewScore = sentiment.score
        json.reviewMagnitude = sentiment.magnitude
        var sent_arr = [];
        const sentences = results[0].sentences;
  
        sentences.forEach((sentence) => {
          sent_arr.push({
            Sentence: sentence.text.content,
            Score: sentence.sentiment.score,
            Magnitude: sentence.sentiment.magnitude
          });
        });
        json.sentences = sent_arr;
        var entity_arr = [];
        
            json.sentences.forEach((sentence) => {
              var sent = sentence["Sentence"];
              const request = {
                document: {
                  'content': json.review,
                  type: 'PLAIN_TEXT'
                }
              };
              language.analyzeEntitySentiment(request)
                .then((results) => {
                  const entities = results[0].entities;
                  if(entities[0] != undefined) {
                    entities.forEach((entity) => {
                      entity_arr.push({
                        Name: entity.name,
                        Type: entity.type,
                        Score: entity.sentiment.score,
                        Magnitude: entity.sentiment.magnitude
                      });
                    });
                  }
                }).catch((err) => {
                  console.error('ERROR:', err);
                });
                //entity_arr.push(sent_dict);
            })
        
            json.entities = entity_arr;
            cb();

      })
      .catch((err) => {
        console.error('ERROR:', err);
      });
}
function analyzeSentences (json, cb) {
  // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');

  // Instantiates a client
  var auth = "./Models/analysis_module/gcloud_auth_key.json"
  const language = Language({
    keyFilename: auth
  });

  const document = {
    'content': json.review,
    type: 'PLAIN_TEXT'
  };
  // Detects the sentiment of the document
  //TODO: implement hashID's for each of the sentences


  //console.log('Starting Analysis...')

  language.analyzeSentiment({ document: document })
    .then((results) => {
      //[START analyzeSentiment]
      const sentiment = results[0].documentSentiment;
      json.reviewScore = sentiment.score
      //fs.writeFileSync(file, JSON.stringify(json, null, 2));
      json.reviewMagnitude = sentiment.magnitude
      //fs.writeFileSync(file, JSON.stringify(json, null, 2));
      var sent_arr = [];
      //console.log(`Document sentiment:`);
      //console.log(`  Score: ${sentiment.score}`);
      //console.log(`  Magnitude: ${sentiment.magnitude}`);
      const sentences = results[0].sentences;

      sentences.forEach((sentence) => {
        sent_arr.push({
          Sentence: sentence.text.content,
          Score: sentence.sentiment.score,
          Magnitude: sentence.sentiment.magnitude
        });
        //console.log(`Sentence: ${sentence.text.content}`);
        //console.log(`  Score: ${sentence.sentiment.score}`);
        //console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
      });
      json.sentences = sent_arr;
      //fs.writeFileSync(file, JSON.stringify(json, null, 2));
      cb(json);
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
    //[END analyzeSentiment]
    
}

function analyzeEntitySentimentOfText (json, cb) {
    // [START language_entity_sentiment_string]
    // Imports the Google Cloud client library
    const Language = require('@google-cloud/language');
  
    // Instantiates a client
    var auth = "./Models/analysis_module/gcloud_auth_key.json"
    const language = Language({
      keyFilename: auth
    });

    // Reading in file
    //console.log('Reading Files...');
    var entity_arr = [];

    json.sentences.forEach((sentence) => {
      var sent = sentence["Sentence"];
      const request = {
        document: {
          'content': json.review,
          type: 'PLAIN_TEXT'
        }
      };
      //var sent_dict = []
      language.analyzeEntitySentiment(request)
        .then((results) => {
          const entities = results[0].entities;
          //console.log(`Entities and sentiments:`);
          if(entities[0] != undefined) {
            entities.forEach((entity) => {
              //console.log(`  Name: ${entity.name}`);
              //console.log(`  Type: ${entity.type}`);
              //console.log(`  Score: ${entity.sentiment.score}`);
              //console.log(`  Magnitude: ${entity.sentiment.magnitude}`);
              entity_arr.push({
                Name: entity.name,
                Type: entity.type,
                Score: entity.sentiment.score,
                Magnitude: entity.sentiment.magnitude
              });
              //console.log(sent_dict);
            });
          }
        }).catch((err) => {
          console.error('ERROR:', err);
        });
        //entity_arr.push(sent_dict);
    })

    json.entities = entity_arr;
    //fs.writeFileSync(file, JSON.stringify(json, null, 2));
    cb();

    // [END language_entity_sentiment_string]
  }

// Main function, arguments require a relative filepath to the authentication api JSON key
// Also requires the absolute filepath to the json file to be read
const argv = require('yargs').argv;

if (argv.file && argv.sentence) {
  analyzeSentences(argv.auth_fp, argv.file);
} else if (argv.file && argv.entity) {
  analyzeSentences(argv.auth_fp, argv.file);
  analyzeEntitySentimentOfText(argv.auth_fp, argv.file);
}
