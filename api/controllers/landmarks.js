module.exports.getSortedLandmarks = (req, res) => {
    Parse.Cloud.run(`fetchSorted`, {'className': 'landmarks'}, null).then(function(results) {
        res.send(JSON.parse(JSON.stringify(results)));
    }, function(error) {
        res.send(error.message);
    });
};

module.exports.getLandmark = (req, res) => {
    Parse.Cloud.run(`fetchLandmark`, {'className': 'landmarks', 'landmarkId': req.params.id}, null).then(function(results) {
        res.send(JSON.parse(JSON.stringify(results)));
    }, function(error) {
        res.send(error.message);
    });
};

module.exports.editContent = (req, res) => {
    Parse.Cloud.run(`editContent`, {'className': 'landmarks', 'landmarkId': req.body.id, 'title': req.body.title, 'shortInfo': req.body.short_info, 'description': req.body.description, 'photo': req.file}, null).then(function(results) {
        res.send(JSON.parse(JSON.stringify(results)));
    }, function(error) {
        res.send(error.message);
    });
};
