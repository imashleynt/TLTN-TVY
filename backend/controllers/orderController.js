import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//place order
const placeOrder = async (req, res) => {

    const frontend_url = "http://localhost:5175";

    try {
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address,
        })
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        //payment process
        const line_items = req.body.items.map((item)=>({
            price_data:{
                currency:"vnd",
                product_data:{
                    name:item.name,
                },
                unit_amount:item.price*100*80, //88.000 VND
            },
            quantity:item.quantity,
        }))

        line_items.push({
            price_data:{
                currency:"vnd",
                product_data:{
                    name:"Phí vận chuyển",
                },
                unit_amount:30000*100, //30.000 VND
            },
            quantity:1,
        })
        const session = await stripe.checkout.sessions.create({
            line_items: line_items,
            mode: "payment",
            success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true,session_url: session.url});

    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Lỗi"});
    }
}


const verfyOrder = async (req, res) => {
    const {orderId, success} = req.body;
    try {
        if(success==="true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            res.json({success:true, message:"Thanh toán thành công!"});
        }else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Thanh toán thất bại!"});
        }
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Lỗi"});
    }
}

//user orders
const userOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({userId: req.body.userId});
        res.json({success:true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Lỗi"});
    }
}

//listing all orders - admin
const listOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({});
        res.json({success:true, data: orders});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Lỗi"});
    }
}

//api update order status - admin
const updateStatus = async (req, res) => {
    try {
        await orderModel.findByIdAndUpdate(req.body.orderId, {status: req.body.status});
        res.json({success:true, message: "Cập nhật đơn hàng thành công"});
    } catch (error) {
        console.log(error);
        res.json({success:false, message: "Lỗi"});
    }
}


export { placeOrder, verfyOrder, userOrders,listOrders, updateStatus };