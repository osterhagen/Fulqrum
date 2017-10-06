Analysis Module -- Notes for Sprint 1 Demo

#1 Set up Google Cloud Authentication

Use this account in order to begin doing analysis. Just use these credentials to
authenticate when prompted.

user: fulqrum307@gmail.com
password: thecarisblue

First, install Google SDK. Do these commands if you're a Mac user (if you need help
go to this site https://cloud.google.com/sdk/downloads)

1. curl https://sdk.cloud.google.com | bash
2. exec -l $SHELL
3. gcloud init (after this you will be prompted to log in, use the given email)

#2 Usage of analysis.js

MAKE SURE that you run --sentence before you run --entity.

The only thing you need to change with these two commands is under the --file flag, you must
put in your own file path to this repo. Make sure that it's an absolute file path
(i.e. include the '/Users/...') or this won't work.

Again, run with --sentence first, then with --entity.

Example usage:
node analysis.js --auth_fp=gcloud_auth_key.json --file=/Users/ThomasHuang/Desktop/CS307/Fulqrum/exampleReview.json --sentence
node analysis.js --auth_fp=gcloud_auth_key.json --file=/Users/ThomasHuang/Desktop/CS307/Fulqrum/exampleReview.json --entity

exampleReview.json will then be appended with the corresponding information.
"sentences:" - list of dicts - List of scores and magnitude for each sentence.
"entities:" - list of list of dicts - List of entities pertaining to each sentence. This is because,
each sentence can have multiple entities, such as 'everyone', 'cow', etc. and each entity is a dict
which will contain salience, etc.

#3 When doing the demo
Start from a fresh copy of exampleReview.json where no 'sentence' and 'entities' are added.
I've already pushed a clean copy to master, so just pull if you need a new copy. My code generates
empty lists for some reason under 'entities' if you run the code over exampleReview.json more than once.

Some notes about the meanings behind each of the output fields from 'sentence' and 'entities':

'score:' of the sentiment ranges between -1.0 (negative) and 1.0 (positive) and corresponds to the overall emotional leaning of the text.
'magnitude:' indicates the overall strength of emotion (both positive and negative) within the given text, between 0.0 and +inf. Unlike score,
 magnitude is not normalized; each expression of emotion within the text (both positive and negative) contributes to the text's magnitude
 (so longer text blocks may have greater magnitudes).

The score of a document's sentiment indicates the overall emotion of a document. The magnitude of a document's sentiment indicates how much
emotional content is present within the document, and this value is often proportional to the length of the document.
A document with a neutral score (around 0.0) may indicate a low-emotion document, or may indicate mixed emotions, with both high positive
and negative values which cancel each out. Generally, you can use magnitude values to disambiguate these cases, as truly neutral documents
will have a low magnitude value, while mixed documents will have higher magnitude values.

Entity Analysis provides information about entities in the text, which generally refer to named "things" such as famous individuals,
landmarks, common objects, etc. Entities broadly fall into two categories: proper nouns that map to unique entities (specific people, places, etc.)
or common nouns (also called "nominals" in natural language processing). A good general practice to follow is that if something is a noun, it
qualifies as an "entity." Entities are returned as indexed offsets into the original text.

My code uses entity sentiment analysis under 'entities.' Entity sentiment analysis combines both entity analysis and sentiment analysis and
attempts to determine the sentiment (positive or negative) expressed about entities within the text. Entity sentiment is represented by
numerical score and magnitude values and is determined for each mention of an entity. Those scores are then aggregated into an overall
sentiment score and magnitude for an entity.
