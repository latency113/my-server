exports.get = (req,res)=>{
    res.send("Get products here");
}
exports.getById = (req,res)=>{
    res.send("Get products " + req.params.id);
}
exports.create = (req,res)=>{
    res.send("Create products");
}