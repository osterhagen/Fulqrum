/*
 * This take's care of database logic 
 * such as verification of inputs
 * retrieving info from database
 * and updating info to database
 * 
 */ 

 var assert = require("assert");
 //Database setup
 var MongoClient = require('mongodb').MongoClient,
 test = require('assert');
// Connection url
var url = "mongodb://fulqrumPurdue:cs307sucks!@fulqrumcluster-shard-00-00-o5o8f.mongodb.net:27017,fulqrumcluster-shard-00-01-o5o8f.mongodb.net:27017,fulqrumcluster-shard-00-02-o5o8f.mongodb.net:27017/test?ssl=true&replicaSet=fulqrumCluster-shard-0&authSource=admin";
// Connect using MongoClient
MongoClient.connect(url, function(err, db) {
 db.close();
});


var randtoken = require('rand-token');
//Keeps track of cookies of companies that are logged in
var loggedInCompanies = [];

exports.registerCompany = registerCompany;
function registerCompany(company, cb) {
    console.log("Company:" + company);
    //console.log(Object.keys(company).length);
    //Verify credentials
    //Check for blank fields
    for (var key in company) {
        if (!company.hasOwnProperty(key)) {
            throw "BlankFieldsError";
        }
    }

    companyExists(company, function(exists) {
        if(exists === true) {
            
        }else {
        //Else company does not exist
            /*The collection is called companies and we will store a new
                company in that collection.  Here we define the function that will do that.
            */
            var insertCompany = function(db, callback) {
                db.collection("companies").insertOne( company, function(err, result) {
                    assert.equal(err, null);
                    console.log("Inserted Company");
                    callback();
                });
            };
            //Now connect to the database and use our function to insert the company  
            MongoClient.connect(url, function(err, db) {
                assert.equal(null, err);
                insertCompany(db, function() {
                    db.close();
                });        
            });
        }
    });
    
   
}

exports.login = login;
function login(username, password, cb) {
    //Verify credentials
    if(username === undefined || password === undefined || username === "" || password === "") {
        throw "BlankFieldsError";
    }
    var company;
    //Valid  info get the company from database

    //Generate token to keep user logged in
    var token = randtoken.generate(16);
    var loggedInCompany = new Object();
    loggedInCompany.token = token;
    loggedInCompany.company = company;
    loggedInCompanies.put(loggedInCompany);
    cb(company, token);    
}

exports.getCompany = getCompany;
function getCompany(token) {
    //Search for company
    for(var i = 0; i < loggedInCompanies.length; i++) {
        if(loggedInCompanies[i].token === token) {
            //Token match, return company
            return loggedInCompanies[i].company;
        }
    }
    //Token not found so invalid
    return undefined;
}

exports.removeLoggedInCompany = removeLoggedInCompany;
function removeLoggedInCompany(token) {
    for(var i = 0; i < loggedInCompanies.length; i++) {
        if(loggedInCompanies[i].token === token) {
            //Token match, return company
            loggedInCompanies.splice(i,1);
            return;
        }
    }
}

exports.listCompanies = listCompanies;
function listCompanies() {
    var findCompanies = function(db, callback) {
        var cursor =db.collection('companies').find( );
        cursor.each(function(err, doc) {
           assert.equal(err, null);
           if (doc != null) {
              console.dir(doc);
           } else {
              callback();
           }
        });
     };
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        findCompanies(db, function() {
            db.close();
        });
      });
}

exports.companyExists = companyExists;
function companyExists(company, callback) {
    var exists = false;
 //See if company is already in database
 var findCompany = function(db, callback) {
    var cursor =db.collection('companies').find( { "name": company.name } );
    cursor.each(function(err, doc) {
       assert.equal(err, null);
       if (doc != null) {
            //One exists
            exists =  true;
        } else {
          callback(exists);
       }
    });
};

MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
  
    findCompany(db, function(exists) {
        db.close();
        callback(exists);
    });
});
}


exports.clearDatabase = clearDatabase;
function clearDatabase() {
    var removeAll = function(db, callback) {
        db.collection('companies').deleteMany( {}, function(err, results) {
           console.log(results);
           callback();
        });
     };
     MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
      
        removeAll(db, function() {
            db.close();
        });
    });
}