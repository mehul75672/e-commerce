const orders = require('../model/orders');

var x = new Date(new Date().setDate(new Date().getDate()))
var date = x.toISOString().slice(0, 10)
var changeDateFormatTo = date => {
    var [yy, mm, dd] = date.split(/-/g);
    return `${dd}-${mm}-${yy}`;
};
var formattedDate = changeDateFormatTo(date);


const order = async (req, res) => {
    try {

        var total = 0
        req.body.products.map((i) => {
            var aa = parseInt(i.price) * parseInt(i.quantity)
            total = parseInt(total) + aa
        })
        var a = parseInt(total) * parseInt(req.body.discount) / 100;
        const user = req.send
        const add = await orders.create({
            user_id: user.id,
            products: req.body.products,
            discount: req.body.discount,
            total_price: a,
            delivery_fee: req.body.delivery_fee,
            delivery_date: req.body.delivery_date,
            Date: formattedDate
        })
        return res.status(201).json({ status: true, result: add })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })
    }
}
//month wise sales 
const total_sales = async (req, res) => {
    try {
        const data = await orders.aggregate([
            {
                $group: {
                    _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
                    totalSaleAmount: { $sum: "$total_price" },
                    count: { $sum: 1 }
                },
            },
            {
                $sort: { totalSaleAmount: -1 }
            }
        ])
        return res.status(200).json({ status: true, result: data })
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: error.messge })

    }
}
module.exports = { order, total_sales }




// date wise sales
// const total_sales = async (req, res) => {
//     try {
//         const data = await orders.aggregate([
//             {
//                 $group: {
//                     _id: "$Date",
//                     totalSaleAmount: { $sum: "$total_price" },
//                     count: { $sum: 1 }
//                 }
//             },
//             {
//                 $sort: { _id: -1 }
//             }
//         ])
//         return res.status(200).json({ status: true, result: data })
//     } catch (error) {
//         console.log(error);
//         return res.status(500).json({ error: error.messge })

//     }
// }