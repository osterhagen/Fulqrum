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
var randtoken = require('rand-token');

exports.encryptPassword = encryptPassword;
function encryptPassword(password, cb) {
    // a basic caesar cypher
    //return password.replace(/[A-Z]/g, L => String.fromCharCode((L.charCodeAt(0) % 26) + 65));
    var out = "";
    for (var i = 0; i < password.length; i++) {
        out += String.fromCharCode(password[i].charCodeAt(0)+3);

    }
    cb(out);
}

exports.registerCompany = registerCompany;
function registerCompany(company, callback) {

    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        db.collection('companies').findOne( { "name": company.name, "password" : company.password }, function(err, result) {
            if(result == null) {
                //Company doesn't exist
                db.collection('companies').insertOne(company, function(err, result) {
                    console.log("Company Inserted");
                    callback(false);
                });
            }else {
                //Company exists
                callback("CompanyAlreadyExists");
            }
        });
    });


}

exports.login = login;
function login(username, password, cb) {
    //Verify credentials
    encryptPassword(password, function(encryptedPassword) {
        MongoClient.connect(url, function(err, db) {
            assert.equal(null, err);

            db.collection('companies').findOne( { "username": username, "password" : encryptedPassword }, function(err, result) {
                //if(result === null) {
                  //  result = "NONE";
                //}
                cb(result);
            });
        });
    });


}

exports.getCompany = getCompany;
function getCompany(token, cb) {
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);

        db.collection('companies').findOne( { "token": token }, function(err, result) {
            if(result === null || result === undefined) {
                //Company doesn't exist
                cb(null);
            }else {
                //Company exists
                cb(result);
            }
        });
    });
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

exports.updateCompany = updateCompany;
function updateCompany(company, cb){
    MongoClient.connect(url, function(err, db) {
        assert.equal(null, err);
        db.collection('companies').update({_id:company._id}, company, function() {
            console.log("Company Updated");
            db.close();
            cb();
        });

    });
}
