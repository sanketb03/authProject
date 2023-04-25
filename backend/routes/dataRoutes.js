const express = require('express')
const requireAuth = require('../middleware/requireAuth')
const { getData, deleteData, addNew } = require('../controllers/dataController')

const router = express.Router()
router.use(requireAuth)

router.get('/getData', getData)
router.post('/deleteData', deleteData)
router.post('/addnew', addNew)



module.exports = router