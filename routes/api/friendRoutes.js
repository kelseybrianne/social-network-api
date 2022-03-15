const router = require("express").Router();
const {
    addFriend,
    removeFriend
} = require("../../controllers/friendController");

router.route("/:userId/friends/:friendId").put(addFriend).delete(removeFriend);

module.exports = router;