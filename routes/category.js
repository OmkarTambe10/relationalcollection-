const express = require("express");
var router = express.Router();
var controller = require("../controllers/categoryController.js");

//***************get request********************** */
router.get("/master", function(req, res){
    res.render("category/master", {
        title : "Category Master"
    });
});

router.get("/getData", function(req, res){
    controller.getData(req, res);
});


router.get("/getRecord/:id", function(req, res){
    controller.getRecord(req, res);
});

router.get("/categoryList", function(req, res){
    controller.categoryList(req, res);
})

router.post("/update/:id", function(req, res){
    controller.update(req, res);
});

//***************put request********************** */
router.put('/addData', function(req, res){
    controller.addData(req, res);
});

module.exports = router;