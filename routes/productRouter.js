const router = require("express").Router();
const productCtrl = require("../controllers/productCtrl");
const auth = require("../middleware/auth");
const authAdmin = require("../middleware/authAdmin");

router
  .route("/products")
  .get(productCtrl.getProducts)
  .post(auth, authAdmin, productCtrl.createProduct);
//.post(productCtrl.createProduct);// Film 07  (07:19) (20:23)

router
  .route("/products/:id")
  .delete(auth, authAdmin, productCtrl.deleteProduct)
  .put(auth, authAdmin, productCtrl.updateProduct);
//.delete(productCtrl.deleteProduct)
//.put(productCtrl.updateProduct);// Film 07  (07:19) (20:23)

module.exports = router;
// film 07     07:19
