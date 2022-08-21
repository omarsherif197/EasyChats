const {makeRoom, getRooms, getRoomUsers} = require('../controllers/roomsController')

const router = require("express").Router();

router.post("/makeroom",makeRoom)
router.get("/getrooms",getRooms)
router.get("/getroomusers",getRoomUsers)
module.exports = router