const mongoose = require('mongoose');
const { DB_URI } = require('./index');

mongoose.connect(DB_URI);
const connection = mongoose.connection;

connection.on("connected", () => {
    console.log("[+] DB connected");
});

connection.on("disconnected", () => {
    console.log("[-] DB disconnected");
});

connection.on("error", (err) => {
    console.log("[-] DB error occured\n", err);
});
