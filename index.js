const { db } = require("./database/db")

require('./app')
.listen(3001, () => {
    console.log("Server listening on port 3001")

    db.sync({ alter: true }).then(() => {
        console.log("We are connected to the database");
    }).catch(error => {
        console.log('An error occurred', error);
    })
})
