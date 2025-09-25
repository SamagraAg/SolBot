import { connect, disconnect } from "mongoose";

const connectToDatabase = async () => {
  try {
    await connect(process.env.MONGODB_URL);
    console.log("Connected to database");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot connect to database");
  }
};

const disconnectFromDatabase = async ()=>{
    try {
    await disconnect();
    console.log("Disconnected from database");
  } catch (error) {
    console.log(error);
    throw new Error("Cannot disconnect from database");
  }
}

export {connectToDatabase,disconnectFromDatabase}