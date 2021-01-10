module.exports.loginUser = async (req, res) => {
    try {
        let results = await Parse.Cloud.run(`login`, {'username': req.body.username, 'password': req.body.password}, null);
        res.send(JSON.parse(JSON.stringify(results)));
    } catch (error) {
        res.send(error.message);
    }
};