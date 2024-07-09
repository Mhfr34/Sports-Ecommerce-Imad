import express from "express";

const router = express.Router();

import userSignUpController from "../controllers/user/userSignUp.js";
import userSignInController from "../controllers/user/userSignIn.js";
import userDetailsController from "../controllers/user/userDetails.js";
import authToken from "../middleware/authToken.js";
import userLogout from "../controllers/user/userLogout.js";
import allUsers from "../controllers/user/allUsers.js";
import updateUser from "../controllers/user/updateUser.js";
import uploadProductController from "../controllers/product/uploadProduct.js";
import getProductController from "../controllers/product/getProduct.js";
import updateProductController from "../controllers/product/updateProduct.js";
import getCategoryProduct from "../controllers/product/getCategoryProduct.js";
import getCategoryWiseProduct from "../controllers/product/getCategoryWiseProduct.js";
import getProductDetails from "../controllers/product/getProductDetails.js";
import addToCartController from "../controllers/user/addToCartController.js";
import countAddToCartProduct from "../controllers/user/countAddToCartProduct.js";
import addToCartDisplayProduct from "../controllers/user/addToCartDisplayProduct.js";
import updateAddToCartProduct from "../controllers/user/updateAddToCartProduct.js";
import deleteAddToCartProduct from "../controllers/user/deleteAddToCartProduct.js";
import searchProduct from "../controllers/product/searchProduct.js";
import filterProductController from "../controllers/product/filterProduct.js";
import paymentController from "../controllers/order/paymentController.js";
import webhooks from "../controllers/order/webhook.js";
import orderController from "../controllers/order/orderController.js";

router.post("/signup", userSignUpController);
router.post("/signin", userSignInController);
router.get("/user-details", authToken, userDetailsController);
router.get("/userLogout", userLogout);

//admin panel
router.get("/all-users", authToken, allUsers);
router.post("/update-user", authToken, updateUser);

// upload product
router.post("/upload-product", authToken, uploadProductController);
router.get("/get-product", getProductController);
router.post("/update-product", authToken, updateProductController);
router.get("/get-categoryProduct", getCategoryProduct);
router.post("/category-product", getCategoryWiseProduct);
router.post("/product-details", getProductDetails);
router.get("/search", searchProduct);
router.post("/filter-product", filterProductController);

// Add to Cart
router.post("/addtocart", authToken, addToCartController);
router.get("/count-product", authToken, countAddToCartProduct);
router.get("/view-cart-product", authToken, addToCartDisplayProduct);
router.post("/update-cart-product", authToken, updateAddToCartProduct);
router.post("/delete-cart-product", authToken, deleteAddToCartProduct);

// payment order
router.post("/checkout", authToken, paymentController);
router.post("/webhook", webhooks); // api/webhook
router.get("/order-list", authToken, orderController);

export default router;
