const router = require("../core/routeConfig");
const user = require("../controller/userController");
const hasToken = require('../core/userAuth')
router.get("/users", user.getAllUsers);

router.get("/users/:Id", user.getUserById);

router.post("/signup", user.signup);

router.get("/signup", user.signup_get);

router.patch("/user", user.updateUser);

router.post("/login", user.login);

router.get("/login", user.login_get);

router.get("/dashboard", hasToken, user.getDashboard);

router.get("/logout", hasToken, user.logout);

module.exports = router;
