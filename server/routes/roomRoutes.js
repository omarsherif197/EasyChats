const {makeRoom, getRooms, getRoomUsers,joinRoom, leaveRoom} = require('../controllers/roomsController')

const router = require("express").Router();

router.post("/makeroom",makeRoom)
router.get("/getrooms",getRooms)
router.post("/getroomusers",getRoomUsers)
router.post("/joinroom",joinRoom)
router.post("/leaveroom",leaveRoom)
module.exports = router