//Mongoose is a JavaScript object-oriented programming library that creates 
// a connection between MongoDB and the Node.js JavaScript runtime environment
// it is mongoDB ODM (object data model)
// 

//  MongoDB is a document-oriented NoSQL database, while Mongoose is an
// Object Data Modeling (ODM) library for Node. js that provides a higher-level abstraction layer on top of MongoDB, allowing developers to define data models using a schema-based approach.
const mongoose = require('mongoose')
// we use mongoose to interact with mongodb using high level abstraction
const chatModel = mongoose.Schema(
    {
        chatName:{type: String, trim :true},
        isGroupChat:{type:Boolean , default:false},
        users:[{
            type : mongoose.Schema.Types.ObjectId,
            ref : "User",
         },
        ],
        latestMessage:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"Message",
        },
        groupAdmin:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
        },
    },
    {
        timestamps:true,
    }
);

const Chat=mongoose.model("Chat",chatModel);

module.exports=Chat;
