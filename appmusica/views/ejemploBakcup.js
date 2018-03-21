MongoClient.connect('mongodb://localhost:27017/AppMusica', function(err, db) {
	if (err) throw err;
	db.getCollection('canciones').find({}).toArray(function (err, result) {
		if (err) throw err;
		console.log(result);	
	});
	
});	


