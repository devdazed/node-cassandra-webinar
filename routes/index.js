
/*
 * GET users listing.
 */

exports.index = function(req, res){
  req.app.get('cassandra').cql('SELECT * FROM users LIMIT 10', function(err, users){
    if(err){
      throw(err);
    }

    res.render('index', { title: 'Users', users: users });
  });
};

exports.new = function(req, res){
  var insert = 'UPDATE users SET first_name=?, last_name=? WHERE email=?',
      params = [req.body.first_name, req.body.last_name, req.body.email];

  req.app.get('cassandra').cql(insert,  params, function(err, users){
    if(err){
      throw(err);
    }

    res.redirect('/');
  });
};

exports.delete = function(req, res){
  var remove = 'DELETE FROM users WHERE email=?',
      params = [req.body.email];

  req.app.get('cassandra').cql(remove,  params, function(err, users){
    if(err){
      throw(err);
    }

    res.redirect('/');
  });
};