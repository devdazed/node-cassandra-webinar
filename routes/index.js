
/*
 * GET home page.
 */

exports.index = function(req, res){
  req.app.get('cassandra').cql('SELECT * FROM users LIMIT 10', function(err, users){
    if(err){
      throw(err);
    }

    res.render('index', { title: 'Users', users: users });
  });

};