module.exports = function(express, app, formidable, fs, os, gm, mongoose, io, s3) {

    var Socket;
    io.on('connection', function(socket){
        Socket = socket;
    })
    
    var singleImage = new mongoose.Schema({
        filename:String,
        votes:Number
    })

    var singleImageModel = mongoose.model('singleImage', singleImage);
    
    var router = express.Router();

    router.get('/', function (req, res, next) {
        res.render('index', {host:app.get('host')});
    })

    router.post('/upload', function(req, res, next){
        var tmpFile, nfile, fname;

        function generateFilename(filename){
            var ext_regex = /(?:\.([^.]+))?$/;
            var ext = ext_regex.exec(filename)[1];
            var date = new Date().getTime();
            var charBank = "abcdefgijklmnopqrstuvwxyz";
            var fstring = '';
            for(var i = 0; i < 15; i++){
                fstring += charBank[parseInt(Math.random()*26)];
            }
            return (fstring += date + '.' + ext);
        }

        var newForm = new formidable.IncomingForm();
            newForm.keepExtensions = true;
            newForm.parse(req, function(err, fields, files){
                tmpFile = files.upload.path;
                fname = generateFilename(files.upload.name);
                nfile = os.tmpdir() + '/' + fname;
                res.writeHead(200, {'Content-type' : 'text/plain'});
                res.end();
            }) 

            newForm.on('end', function(){
                fs.rename(tmpFile, nfile, function(){
                    // Resize the image and upload this file into the S3 bucket
                    gm(nfile).resize(300).write(nfile, function(){
                        //Upload to the S3 Bucket
                        fs.readFile(nfile, function(err, buf){
                            const params = {
                                Key: fname,
                                Body: buf,
                                ContentType: 'image/jpeg',
                            };

                            s3.upload(params, function(s3Err, buf) {
                                if (s3Err) throw s3Err
                                console.log("File uploaded successfully");
                                var newImage = new singleImageModel({
                                    filename: fname,
                                    votes: 0
                                }).save();
                                
                                // Single front-end
                                Socket.emit('status', {'msg': 'Saved !!', 'delay':3000});
                                Socket.emit('doUpdate', {});

                                // Delete local file
                                fs.unlink(nfile, function(){
                                    console.log('Local File Deleted');
                                })
                            });
                        })
                    })
                })
            })
    })

    router.get('/getimages', function (req, res, next) {
        singleImageModel.find({}, null, { sort: { votes: -1 } }, function (err, result) {
            res.send(JSON.stringify(result));
        })
    })

    router.get('/voteup/:id', function (req, res, next) {
        singleImageModel.findOneAndUpdate({ _id: req.params.id }, { $inc: { votes: 1 } }, function (err, result) {
            //findOneAndUpdate({ _id: id }, ...)
            res.status(200).send( { votes: result.votes });
        })
    })

    app.use('/', router);
}