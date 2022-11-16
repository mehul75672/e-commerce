var jwt = require('jsonwebtoken');
const User = require('../model/User');

const auth = async (req, res, next) => {
    const token = req.header('x-auth-token');
    if (token) {
        await jwt.verify(token, process.env.SECRETKEY, async (err, verifytoken) => {
            if (err) {
                console.log("token is not verify");
                return res.status(400).json(err);

            } else {
                let user = await User.findById(verifytoken.id);
                req.send = user;
                next();
            }
        });
    } else {
        return res.status(500).json("provid the token");
    }
}
module.exports = { auth };









// const product_all = async (req, res) => {
//     try {
//         let all = await Products.aggregate([
//             {
//                 $lookup: {
//                     from: 'categories',
//                     localField: "category_id",
//                     foreignField: "_id",
//                     as: "category"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "brands",
//                     localField: "brand_id",
//                     foreignField: "_id",
//                     as: "brand"
//                 }
//             },
//             {
//                 $lookup: {
//                     from: "attributes",
//                     localField: "attributes.attribute_id",
//                     foreignField: "_id",
//                     let: {
//                         attribute_values_ids: {
//                             $reduce: {
//                                 input: "$attributes.attribute_value",
//                                 initialValue:[],
//                                 in: {
//                                     $concatArrays: [
//                                         "$$value",
//                                         "$$this.attribute_value_id"
//                                     ]
//                                 }
//                             }
//                         }
                        
//                     },              
//                     pipeline: [{
//                         $project: {    
//                             Name: 1,
//                             value: {
//                                 $filter:
//                                 {
//                                     input: "$value",
//                                     as: "grade",
//                                     cond: { $in: ["$$grade._id", "$$attribute_values_ids"] }
//                                 }
//                             },
//                         },
//                     },
//                     {
//                         $lookup: {
//                             from: "attributes_groups",
//                             localField: "_id",
//                             foreignField: "attribute.attribute_id",
//                             as: "attributesgroup"
//                         }
//                     }
//                     ],
//                     as: "attributes"
//                 }
//             },
//             {
//                 $project: {
//                     "category": "$category.category_name",
//                     "brand": "$brand.name",
//                     "attributes": "$attributes"
//                 }
//             }

//         ])
//         return res.status(201).json({ status: true, result: all })

//     } catch (error) {
//         return res.status(500).json({ status: false, error: error.message })

//     }
// }
