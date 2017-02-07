var MongoClient = require('mongodb').MongoClient;

var WatchlistQuery = function() {
  this.url = "mongodb://localhost:27017/watchlist";
}

WatchlistQuery.prototype = {
  all: function(onQueryFinished) {
    MongoClient.connect(this.url, function(err, db) {
      var collection = db.collection("launches");
      collection.find().toArray(function(err, docs) {
        onQueryFinished(docs);
      })
    })
  },
  add: function(launchToAdd, onQueryFinished) {
    console.log("ADDING", launchToAdd);
    console.log("URL:", this.url);
    MongoClient.connect(this.url, function(err, db) {
      if (err) {
        console.log("Error:", err);
      } else if (db) {
        var collection = db.collection("launches");
        collection.insert(launchToAdd);
        collection.find().toArray(function(err, docs) {
          onQueryFinished(docs);
       });
      }
    });
  }

}

module.exports = WatchlistQuery;