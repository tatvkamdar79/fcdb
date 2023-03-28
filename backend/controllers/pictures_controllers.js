

module.exports.getPicture = (req,res) => {
    console.log("Found pic!")
    res.send("Found picture")
}

module.exports.postPicture = (req,res) => {
    if(req.fileValidationError){
        console.log("file not valid")
        return res.send(req.fileValidationError)
    }
    console.log("Posting pic!")
    res.send("Posting picture")
}