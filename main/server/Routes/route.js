const { signup,login,checkAuth } = require("../Controllers/authController");
const {
    getUsers,
    addToFav,
    addToDis,
    getFromFav,
  } = require("../Controllers/userController");
const { verifyToken } = require("../Middleware/verifyToken");

const router = require("express").Router();


// AUTHENTICATION ROUTES

router.post("/signup", signup);
router.post("/login", login);
router.get("/checkAuth",verifyToken,  checkAuth);


// USER ROUTES
router.get("/getUsers", getUsers);
router.put("/addToFav/:id", verifyToken, addToFav);
router.put("/addToDis/:id", verifyToken, addToDis);
router.get("/getFromFav", verifyToken, getFromFav);
module.exports = router;





module.exports = router;