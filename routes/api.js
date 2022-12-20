const router = require("express").Router();
const version = require("./v1/api-v1");

router.get("/api", (req, res) => {
    res.send("Reached API Router");
})
router.use("/api", version);

module.exports = router;