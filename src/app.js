const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;
const upload = require('./services/upload');
const server = app.listen(PORT, () =>{
    console.log(`Servidor escuchando en mi proyecto, products: ${PORT}`);
})
server.on('error', (error)=>console.log(`Error en el servidor ${error}`))

const productsRouter = require('./routes/products');
const Contenedor = require('./classes/Contenedor');
const contenedor = new Contenedor();

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());
app.use('/api/productos', productsRouter);
// app.use('/api/users', usersRouter);
app.use('/imagenes', express.static(__dirname+'/public'));
app.use((req,res,next)=>{
    let timestamp = Date.now();
    let time = new Date(timestamp);
    console.log(`Peticion hecha a las ${time.toTimeString().split(" ")[0]}`);
    next();
})

app.get('/', (req, res)=>{
    res.send('<h1 style="color:orange"> Bienvenido al servidor </h1> <br> <h3> Franco Chachagua - Camada 17045 <h3>');
})

app.post('/api/uploadfile',upload.array('images'),(req,res)=>{
    const files = req.files;
    if(!files || files.length===0){
        res.status(500).send({message:"No se subio el archivo"})
    }
    res.send(files);
})