import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'uploads/')
    },
    filename(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

const checkFileType = (file, cb) => {
    const filetypes = /jpeg|png|jpeg|jfif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        cb(null, true);
    }
    else {
        cb('Images only');
    }
};

export const uploadConfig = multer({
    storage,
    fileFilter: function (req, file, cb) {
        checkFileType(file, cb);
    },
});

export const upload = (req, res) => {
    console.log("algo > ", req);
    res.send(`/${req.file.path.replace(/\\/g, '/')}`);

};

