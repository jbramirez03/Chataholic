// const mongoose = require('mongoose');
import mongoose from 'mongoose';

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/chataholic', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false
});

// module.exports = mongoose.connection;
export default mongoose.connection;