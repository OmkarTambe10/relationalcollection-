const mongoose = require("mongoose");
var schema = mongoose.Schema;

var formSchema = new schema({
    productId : Number,
    productName : String,
    categoryName : String,
    createdon : { type : Date},
    updatedon : { type : Date}
});

module.exports = mongoose.model("product", formSchema, "product");