const mongoose = require('mongoose');

// const mongoURI = "mongodb+srv://neverstopdreaming363:rahul123@cluster0.nza54kn.mongodb.net/merngofood?retryWrites=true&w=majority";
const mongoURI = "mongodb+srv://neverstopdreaming363:rahul123@cluster0.nza54kn.mongodb.net/merngofood?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);

    mongoose.connection.on('connected', () => {
      console.log('Connected to MongoDB');
    });

    mongoose.connection.on('error', (err) => {
      console.error('MongoDB connection error:', err);
    });

    mongoose.connection.on('disconnected', () => {
      console.log('MongoDB disconnected');
    });

    if (mongoose.connection.readyState !== 1) {
      throw new Error('MongoDB connection not established');
    }

    console.log("Connected");

    const fetch_Data = mongoose.connection.db.collection("sample");
    const data = await fetch_Data.find({}).toArray();

    const foodCategory = mongoose.connection.db.collection("food_catrgory");
    const catData = await foodCategory.find({}).toArray();


    global.foodCategory = catData;
    global.food_items = data;
  } catch (error) {
    console.error("Connection error:", error);
  }
};

module.exports = mongoDB;
