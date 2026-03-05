import Transaction from "../models/Transaction.js";
import Stripe from "stripe";


const plans=[

     {
        _id: "basic",
        name: "Basic",
        price: 10,
        credits: 100,
        features: ['100 text generations', '50 image generations', 'Standard support', 'Access to basic models']
    },
    {
        _id: "pro",
        name: "Pro",
        price: 20,
        credits: 500,
        features: ['500 text generations', '200 image generations', 'Priority support', 'Access to pro models', 'Faster response time']
    },
    {
        _id: "premium",
        name: "Premium",
        price: 30,
        credits: 1000,
        features: ['1000 text generations', '500 image generations', '24/7 VIP support', 'Access to premium models', 'Dedicated account manager']
    }
]

// Api to get all plans

export const getPlans = async (req, res) => {

    try{

        res.json({success:true, plans});

    }catch(error){
        return res.json({success:false, message:error.message});
    }           
};

const stripe=new Stripe(process.env.STRIPE_SECRET_KEY);

// Api to buy a plan

export const purchasePlan = async (req, res) => {
    try{

       
        const {planId}=req.body;
        const userId=req.user._id;
        const plan=plans.find(p=>p._id===planId);

        if(!plan){
            return res.json({success:false, message:"Plan not found"});
        }

        // Create new trasanction
        const transaction=await Transaction.create({
            userId:userId,
            planId:plan._id,
            amount:plan.price,
            credits:plan.credits,
            isPaid:false
        });
        // A new transaction is created for purchasing the plan. We will update the transaction after payment is successful and add credits to user account

        // now we generate the payment link using stripe and send it to the frontend. After payment is successful we will update the transaction and add credits to user account

        // now create a checkout session
        const {origin}=req.headers; // we will use this to construct the success and cancel url

        const session = await stripe.checkout.sessions.create({
        line_items: [
      {
         price_data:{
            currency:'usd',
            unit_amount: plan.price*100,
            product_data:{
            name: plan.name,

         }
         ,
         
    },
    quantity: 1,
        }],
         mode: 'payment',
        success_url: `${origin}/loading`,
        cancel_url:`${origin}`, 
        metadata:{transactionId:transaction._id.toString(), appId:"quickgpt"},
        expires_at: Math.floor(Date.now()/1000)+30*60, // session will expire in 15 minutes
});

        res.json({success:true, url:session.url});





    }catch(error){
        return res.json({success:false, message:error.message});
    }

};