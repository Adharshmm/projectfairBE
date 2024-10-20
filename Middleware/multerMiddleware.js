const multer = require('multer')

const storage = multer.diskStorage({
    //it conatins of 2 keys
    //first is destination
    //second  is file name
    destination: (req, file, callback) => {
        callback(null, './uploads')
    },
    filename: (req, file, callback) => {
        const fileName = `image-${Date.now()}-${file.originalname}`
        callback(null, fileName)
    }
})
// impliment file filter
const filterFile = (req, file, callback) => {
    /* A MIME type (Multipurpose Internet Mail Extensions type) 
    is a standardized way to indicate the nature and format of 
    a file being sent over the internet. It tells the browser 
    or server what type of content is being transmitted so that 
    it can handle the file appropriately. 
    
    MIME Type Structure
    A MIME type consists of two parts:

    Type: The general category of the file, such as text, image, audio, video, or application.
    Subtype: The specific file format within that category, like html for HTML files or jpeg for JPEG images.*/
//mimetype === "type/subtype"
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/jpg') {
        callback(null, true)
    } else {
        callback(null, false)
        return callback(new ErrorEvent("only png,jpeg,jpg files are allowed"))
    }
}
const multerConfig = multer({
    storage,
    filterFile
})
module.exports = multerConfig