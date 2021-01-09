module.exports.loginUser = (req, res) => {
    Parse.Cloud.run(`login`, {'username': req.body.username, 'password': req.body.password}, null).then(function(results) {
        res.send(JSON.parse(JSON.stringify(results)));
    }, function(error) {
        res.send(error.message);
    });
};