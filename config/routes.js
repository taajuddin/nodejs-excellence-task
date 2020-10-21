const express = require('express')
const router = express.Router() 
const condidatesCltr = require('../app/controllers/condidatesCltr')

router.post('/insertCondidate',  condidatesCltr.insert_condidate)
router.post('/assignScore', condidatesCltr.assign_score)
router.get('/highestScore', condidatesCltr.highest_score)





module.exports = router