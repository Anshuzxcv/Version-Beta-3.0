const tips = require('../schema/tipsSchema');

exports.createtips=async(req,res)=>{
    try{
        console.log(req.body);
        if(req.body.tip)
        {
        const newtips =await tips.create(req.body);
        res.send(newtips);
        }
        else res.send('data not found');
    }
    catch(err){
        console.log(err);
        res.send(err);
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * Math.floor(max));
}
exports.tip=async(req,res)=>{
    try{
        const alltips  = await tips.find();
        let cnt =0;
        alltips.map((el)=>{cnt++;})
        temp = await getRandomInt(cnt);
        res.send(alltips[temp]);
    }
    catch(err){
        res.send(err);
    }
}