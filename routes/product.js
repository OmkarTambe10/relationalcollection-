const express = require("express");
var router = express.Router();
var controller = require("../controllers/productController.js");

//***************get request********************** */
router.get("/master", function(req, res){
    res.render("product/master", {
        title : "Product Master"
    });
});

router.get("/getData", function(req, res){
    controller.getData(req, res);
});


router.get("/getRecord/:id", function(req, res){
    controller.getRecord(req, res);
});

router.post("/update/:id", function(req, res){
    console
    controller.update(req, res);
});

//***************put request********************** */
router.put('/addData', function(req, res){
    controller.addData(req, res);
});

module.exports = router;