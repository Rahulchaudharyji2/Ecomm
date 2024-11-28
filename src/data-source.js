const mongoose = require('mongoose');

const dbUrl = process.env.MONGO_URL || 'mongodb+srv://rahulchaudharyji2:rzt5aMdQyyhCb2S2@cluster0.nzxzs3o.mongodb.net/EComm?retryWrites=true&w=majority&appName=Cluster0';


class Database{
    static async connect() {
        try {
            await mongoose.connect(dbUrl);
        
        }
        catch (err) {
            console.error(err);
        }
    }

    static async disconnect() {
        try {
            await mongoose.disconnect();
        }
        catch (err) {
            console.error(err);
        }
    }
}

module.exports = Database;
