const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const isEmail = require('validator/lib/isEmail')

//set up a mongoose model.
const condidateSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique:true,
        validate: {
            validator: function(value){
                return isEmail(value)
            },
            message: function(){
                return 'invalid email format'
            }
        }
    },
    first_round: {
        type: Number
    },
    second_round: {
        type: Number
    },
    third_round: {
        type: Number
    }

})

const Condidate = mongoose.model('Condidate', condidateSchema)

module.exports=Condidate
