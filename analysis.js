#! /usr/bin/env node

function analyzeSentimentOfText (text) {
  // [START language_sentiment_string]
  // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');

  // Instantiates a client
  const language = Language();

  // The text to analyze, e.g. "Hello, world!"
  // const text = 'Hello, world!';

  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };

  console.log('starting');

  // Detects the sentiment of the document
  language.analyzeSentiment({ document: document })
    .then((results) => {
      const sentiment = results[0].documentSentiment;
      console.log(`Document sentiment:`);
      console.log(`  Score: ${sentiment.score}`);
      console.log(`  Magnitude: ${sentiment.magnitude}`);

      const sentences = results[0].sentences;
      sentences.forEach((sentence) => {
        console.log(`Sentence: ${sentence.text.content}`);
        console.log(`  Score: ${sentence.sentiment.score}`);
        console.log(`  Magnitude: ${sentence.sentiment.magnitude}`);
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END language_sentiment_string]
}

function analyzeEntitiesOfText (text) {
  // [START language_entities_string]
  // Imports the Google Cloud client library
  const Language = require('@google-cloud/language');

  // Instantiates a client
  const language = Language();

  // The text to analyze, e.g. "Hello, world!"
  // const text = 'Hello, world!';

  // Instantiates a Document, representing the provided text
  const document = {
    'content': text,
    type: 'PLAIN_TEXT'
  };

  // Detects entities in the document
  language.analyzeEntities({ document: document })
    .then((results) => {
      const entities = results[0].entities;

      console.log('Entities:');
      entities.forEach((entity) => {
        console.log(entity.name);
        console.log(` - Type: ${entity.type}, Salience: ${entity.salience}`);
        if (entity.metadata && entity.metadata.wikipedia_url) {
          console.log(` - Wikipedia URL: ${entity.metadata.wikipedia_url}$`);
        }
      });
    })
    .catch((err) => {
      console.error('ERROR:', err);
    });
  // [END language_entities_string]
}

const argv = require('yargs').argv;

if(argv.sentimenttxt) {
  analyzeSentimentOfText(argv.sentimenttxt);
} else if (argv.entitytxt) {
  analyzeEntitiesOfText(argv.entitytxt);
}
