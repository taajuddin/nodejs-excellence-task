const Condidate = require('../models/condidate')

const condidatesCltr = {}

condidatesCltr.assign_score = (req,res)=>{
    if(!req.body.email){
        res.json({
            success: false,
            msg: "Details missing"
        })
    }else{
            Condidate.findOneAndUpdate({email: req.body.email},{$set: {first_round: req.body.first_round, second_round: req.body.second_round, third_round: req.body.third_round}}, (err, updated)=>{
                if(err){
                    res.json({
                        success: false,
                        msg: "Error in updating score. Please try again after some time."
                    })
                }else{
                    res.json({
                        success: true,
                        msg: "Score updated."
                    })
                }
            })
        }
    }

 condidatesCltr.highest_score = (req,res)=>{

    Condidate.aggregate([{"$group" : {"_id" : null,
    "highest_score" : {"$max" : {"$sum" : ["$first_round", "$second_round", "$third_round"]}},
    "avg_firstRound" : {"$avg" : "$first_round"},
    "avg_secondRound" : {"$avg" : "$second_round"},
    "avg_thirdRound" : {"$avg" : "$third_round"} }}
    ], (err, data)=>{
                if(err){
                    res.json({
                        success: false,
                        msg: err
                    })
                }else{
                    res.json({
                        success: true,
                        data: data
                    })
                }
            })
    }



    condidatesCltr.insert_condidate = (req, res) => {
    if(req.body.name && req.body.email){
                let newCandidate = new Condidate({
                    name: req.body.name,
                    email: req.body.email
                })

                newCandidate.save( (err, data) => {
                    if(err){
                        console.log(err)
                        res.json({
                            success: false,
                            msg: "Enter the details properly!",
                            err
                        })
                    } else{
                        res.json({
                            success: true,
                            msg: "New candidate inserted!",
                            data: data
                        })
                    }
                }) 
    }
    else{
        res.json({
            success: false,
            msg: "Please fill all the details!"
        })
    }
}


module.exports=condidatesCltr