module.exports.getSortedLandmarks = async (req, res) => {
    try {
        let results = await Parse.Cloud.run(`fetchSorted`, {'className': 'landmarks'}, null);
        res.send(JSON.parse(JSON.stringify(results)));
    } catch (error) {
        res.send(error.message);
    }
};

module.exports.getLandmark = async (req, res) => {
    try {
        let results = await Parse.Cloud.run(`fetchLandmark`, {'className': 'landmarks', 'landmarkId': req.params.id}, null);
        res.send(JSON.parse(JSON.stringify(results)));
    } catch (error) {
        res.send(error.message);
    }
};

module.exports.editContent = async (req, res) => {
    try {
        let results = await Parse.Cloud.run(`editContent`, {'className': 'landmarks', 'landmarkId': req.body.id, 'title': req.body.title, 'shortInfo': req.body.short_info, 'description': req.body.description, 'photo': req.file}, null);
        res.send(JSON.parse(JSON.stringify(results)));
    } catch (error) {
        res.send(error.message);
    }
};
