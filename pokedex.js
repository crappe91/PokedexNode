const express = require('express')
const bodyParser  = require('body-parser');
const app = express()

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


require('dotenv').config()
const port = process.env.PORT || 4000

// //Conexión a la Base de Datos
// const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost/test',{userNewUrlParser: true, useUnifiedTopology: true});

//Conexión a base de datos USAMOS ESTA FORMA EN VEZ DE LA DE ARRIBA POR QUE TENEMOS ALOJADA LA BBDD EN UNA WEB
const mongoose = require('mongoose');
//Variables que tendremos siempre:
//Lo correcto será declararlas EN VARIABLES DE ENTORNO
//para que nadie vea directamente nuestras credenciales

// LO PILLAREMOS DEL .ENV
// const user = 'cursoNode';
// const password = 'zaSWL3K72JMbD0s6';
// const dbname = 'DBPokemon';


const uri = `mongodb+srv://${process.env.DB_USSER}:${process.env.DB_PASSWORD}@cluster0.westfkq.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`; //URL de conexión, que completaremos luego
mongoose.set('strictQuery', false);
mongoose.connect(uri,
  { useNewUrlParser: true, useUnifiedTopology: true }
)

  .then(() => console.log('Base de datos conectada'))
  .catch(e => console.log(e))


//Middleware
app.use(express.static(__dirname + '/public'))

//motor plantilla

app.set('view engine', 'ejs')
app.set('views', __dirname+ '/views')

//Middleware
app.use(express.static(__dirname + '/public'))

// //Peticiones básicas http
// app.get('/', (req, res) => {
//   res.render("Index", {titulo : "mi titulo dinámico"})
// })

// app.get('/contacto', (req, res) => {
//     res.render("contacto", {tituloContacto : "Estamos en contacto de forma dinamica"})
// })

//LLamadas a las rutas
app.use('/', require('./router/rutas'))
app.use('/pokemon', require('./router/pokemon'))
app.use('/entrenador', require('./router/entrenador'))

app.use((req,res) => {
    res.status(404).render("404", {
        titulo: "Error 404",
        descripcion: "Page Not Found"
    })
   })
   

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})



