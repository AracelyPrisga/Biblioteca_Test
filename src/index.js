//Modulo express como servidor
const express = require("express");
const app = express();

//settings
//variable port desde app
app.set('port',process.env.PORT||3000);

//Middlewars -- Iterpretación de datos
//Manejo de datos en formato json
app.use(express.json());

//routes
app.use(require('./routes/Book'))

app.listen(app.get('port'),() => {
    console.log("Server on port", app.get('port'));
})
 