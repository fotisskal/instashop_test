require('dotenv').config();
const Promise = require('bluebird');
const _ = require('lodash');
const sharp = require("sharp");
sharp.cache(false); //disable sharp cache -> unlink original file
const fs = require("fs");

//Import json file contents to parse-server
Parse.Cloud.define("import", function (request, response) {
  let i;
  let className = request.params.className;
  let rows = request.params.rows;

  const MyClass = Parse.Object.extend(className);

  const promises = [];
  for (i = 0; i < rows.length; i++) {
    let myClassObject = new MyClass();

    for (let column in rows[i]) {
      myClassObject.set(column, rows[i][column]);
    }

    promises.push(myClassObject.save());
  }

  Parse.Promise
      .when(promises)
      .then(
          function () {
            response.success('Successfully imported ' + i + ' rows into ' + className + ' class');
          },
          function (error) {
            response.error('Import failed: ' + error);
          });
});

//Login Query with credentials. Response: token and user role
Parse.Cloud.define("login", function (request, response) {
    let username = request.params.username;
    let password = request.params.password;

    Promise.resolve(Parse.User.logIn(username, password, null))
        .then( function (user) {
            if (user) {
                let token = user.getSessionToken();
                let roleQuery = new Parse.Query(Parse.Role);
                roleQuery.equalTo('users', user);
                Promise.resolve(roleQuery.find(null))
                    .then(function (role) {
                        if (role) {
                            let role_object = role[0].toJSON();
                            let login_response = {
                                token: token,
                                role: role_object.name,
                            }
                            response.success(login_response);
                        } else {
                            response.success(false);
                        }
                    }, function (err) {
                        response.error(err.message);
                    })
            } else {
                response.error('No such user registered.');
            }
        }, function (err) {
            response.error(err.message);
        })
});

//GET landmarks Query, incrementally sorted.
Parse.Cloud.define("fetchSorted", (request, response) => {
  let className = request.params.className;
  const query = new Parse.Query(className);
  query.ascending("order");
  let promises = [];
  promises.push(query.find({ useMasterKey: true }));
  Promise.all(promises)
        .then(
            function (results) {
                let objects = []
                _.forEach(results[0], function(e) {
                    objects.push(e.toJSON());
                });
                response.success(objects);
            },
            function (error) {
                response.error(error.message);
            });
});

//GET specific landmark Query, by objectId.
Parse.Cloud.define("fetchLandmark", (request, response) => {
    let className = request.params.className;
    let landmarkId = request.params.landmarkId;
    const query = new Parse.Query(className);
    query.equalTo("objectId", landmarkId);
    let promises = [];
    promises.push(query.find({ useMasterKey: true }));
    Promise.all(promises)
        .then(
            function (results) {
                let objects = []
                _.forEach(results[0], function(e) {
                    objects.push(e.toJSON());
                });
                response.success(JSON.stringify(objects[0]));
            },
            function (error) {
                response.error(error.message);
            });
});

//UPDATE Landmark Content Query (title, short info, description, photo upload, photo thumbnail upload)
Parse.Cloud.define("editContent", (request, response) => {
    let className = request.params.className;
    let landmarkId = request.params.landmarkId;
    const query = new Parse.Query(className);
    query.equalTo("objectId", landmarkId);
    Promise.resolve(query.find({ useMasterKey: true }))
        .then( function (results) {
            let object = results[0];
            object.set("title", request.params.title);
            object.set("short_info", request.params.shortInfo);
            object.set("description", request.params.description);
            if (request.params.photo && fs.statSync(request.params.photo.path)) {
                if (request.params.photo.size/1024/1024 <= 5) {
                    let bitmap = fs.readFileSync(request.params.photo.path);
                    let bufferImage = Buffer.from(bitmap);
                    let base64 = bufferImage.toString('base64');
                    let imgFile = new Parse.File("imgFile.jpg", {base64: base64});
                    object.set("photo", imgFile);
                    sharp(bufferImage)
                        .resize(Number(process.env.PHOTO_HEIGHT), Number(process.env.PHOTO_WIDTH), {fit: 'fill'})
                        .withMetadata()
                        .toBuffer()
                        .then(data => {
                        if (data === null) {
                            fs.unlinkSync(request.params.photo.path);
                            response.error(err.message);
                        } else {
                            let base64Thumb = data.toString('base64');
                            let imgFileThumb = new Parse.File("imgFileThumb.jpg", {base64: base64Thumb});
                            object.set("photo_thumb", imgFileThumb);
                            Promise.resolve(object.save())
                                .then(
                                    function () {
                                        fs.unlinkSync(request.params.photo.path);
                                        response.success({result: 'success'});
                                    },
                                    function (error) {
                                        fs.unlinkSync(request.params.photo.path);
                                        response.error(error.message);
                                    });
                        }
                    });
                } else {
                    fs.unlinkSync(request.params.photo.path);
                    response.error('Image size should not be larger than 5 MB!');
                }
            } else {
                Promise.resolve(object.save())
                    .then(
                        function () {
                            response.success({result: 'success'});
                        },
                        function (error) {
                            response.error(error.message);
                        });
            }
        });
});
