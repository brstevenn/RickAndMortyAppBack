require('dotenv').config()
const { PORT } = process.env
const { db } = require("./database/db")

require('./app')
.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`)

    db.sync({ alter: true }).then(() => {
        console.log("We are connected to the database");
    }).catch(error => {
        console.log('An error occurred', error);
    })
})
