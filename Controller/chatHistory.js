const { find } = require("../helper/DBUtils/mongoDB");
const roomChatSchema = require("../models/roomChat");
const roomUserSchema = require("../models/roomUser");

const chatHistory = async (req,res) => {
    const room = req.query.room;
    let error = null;
    const chatHistory = await find(roomChatSchema,{roomName: room}).catch((err) => {
        console.log(err);
        error = err;
    });
    const userList = await find(roomUserSchema,{roomName: room}).catch((err) => {
        console.log(err);
        error =err;
    });
    if(error){
        return res.status(500).json({
            status: FAILED,
            message: "Internal server error"
        })
    }

    return res.status(200).json({
        chatHistory,
        userList
    })
}

module.exports = chatHistory;
