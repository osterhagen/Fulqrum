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
function registerCompany(company, callback) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
    
        db.collection('companies').findOne( { "name": company.name, "password" : company.password }, function(err, result) {
            if(result == null) {
                //Company doesn't exist
                db.collection('companies').insertOne(company, function(err, result) {
                    console.log("Company Inserted");
                });
            }else {
                //Company exists
                console.log(result);
            }
        });
    });
    
   
}

exports.login = login;
function login(username, password, cb) {
    console.log(username);
    console.log(password);
    //Verify credentials

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
    
        db.collection('companies').findOne( { "name": username, "password" : password }, function(err, result) {
            cb(result);
        });
    });

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