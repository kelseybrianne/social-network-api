const router = require("express").Router();
const {
    createReaction,
    removeReaction
} = require("../../controllers/reactionController");

router.route("/:thoughtId/reactions").post(createReaction).delete(removeReaction);

module.exports = router;