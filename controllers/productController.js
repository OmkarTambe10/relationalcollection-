const model = require("../models/productModel.js");

module.exports = {

    /**
     * desc : saves data
     */
    addData : function(req, res){
        try{
            var formData = req.body;
            formData.createdon = new Date();
            var data = new model(formData);
            data.save(function(error,result){
                if(error){
                    return res.status(500).json({
                        success : false,
                        message : "Internal server error",
                        err : error,
                        data : []
                    })
                }else{
                    return res.status(200).json({
                        success : true,
                        message : "Data successfully saved",
                        err : [],
                        data : result
                    })
                }
            });
        }catch(e){
            return res.status(500).json({
                err: e,
                success : false
            })
        }
    },

    /**
     * desc : gets list of all data
     */
    getData : function(req,res){
        try{
            model.aggregate(
                [
                    {
                        $match : {}
                    },
                    {
                        $lookup: {
                            from: "category",
                            localField: "categoryName",
                            foreignField: "categoryName",
                            as: "categoryData"
                        } 
                    },
                    {
                        $unwind : "$categoryData"
                    },
                    // { "$sort": { "person": 1 } }
                ], function(error, result){
                    if(error){
                        return res.status(500).json({
                            success : false,
                            message : "Internal server error",
                            err : error,
                            data : []
                        })
                    }else{
                        return res.status(200).json({
                            success : true,
                            message : "Data successfully saved",
                            err : [],
                            data : result
                        })
                    }
                }
            )
        }catch(e){
            console.log(e)
        } 
    },

    getRecord : function(req, res){
        var id = req.params.id;
        try{
            model.findOne({"_id" : id}).lean().exec(function(error, result){
                if(error){
                    return res.status(500).json({
                        success : false,
                        message : "Internal server error.",
                        err : err,
                        data : []
                    })
                }else{
                    return res.status(200).json({
                        success : true,
                        message : "Fetch Data successfully.",
                        err : [],
                        data : result
                    })
                }
            });
        }
        catch(e){
            console.log(e);
            return res.status(500).json({
                err: e,
                success : false
            })
        }
    },

    update : function(req, res){
        var formData = req.body;
        formData.updatedon = new Date(Date.now()).toISOString();        
        var id = req.params.id;
        console.log("id:",id)
        console.log("formData",formData);
        model.updateOne({
            _id : id
        },
        {
            $set : formData
        }).lean().exec(function(error, result){
            if(error){
                return res.status(500).json({
                    success : false,
                    message : "Internal server error",
                    err : error,
                    data : []
                })
            }else{
                return res.status(200).json({
                    success : true,
                    message : "Data successfully updated",
                    err : [],
                    data : result
                })
            }           
        });
    }


}