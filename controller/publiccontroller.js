exports.createtips=async(req,res)=>{
    try{
        if(req.body.tips)
        {const newtips = tips.create(req.body.tips);
        res.send(newtips);}
        else res.send('data not found');
    }
    catch(err){
        res.send(err);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.tip=async(req,res)=>{
    try{
        const alltips  = tips.find();
        res.send (alltips[getRandomInt((await alltips).length())]);
    }
    catch(err){
        res.send(err);
    }
}