import multer from 'multer';
import path from 'path';

//adjust destination 

const imageStorage = multer.diskStorage({
    destination: function(req, file, cb) {
        let folder = "";

        if(req.baseUrl.includes("users")) {
            folder = "users";
        } else if(req.baseUrl.includes("postsCreate")) {
            folder = "toughtPosts";
        }

        cb(null, `public/images/${folder}`)
    },

    //configure file name
    filename: function(req, file, cb) {
        //make a single registration
        cb(null, Date.now() + String(Math.floor(Math.random() * 1000)) + path.extname(file.originalname));
        //ex 3423423423423234.jpg
    }
});

//handle image updload

const imageUpload  = multer({
    storage: imageStorage,
    fileFilter: function(req, file, cb) {
        if(!file.originalname.match(/\.(png|jpg|jpeg)$/)) {
            return cb(new Error("Por favor apenas png jpg ou jpeg"));
        }
        cb(null, true);
    }
});

export default imageUpload;