const express = require('express');
const router = express.Router();
const Contenedor = require('../classes/Contenedor');
const contenedor = new Contenedor();
const upload = require('../services/upload');

// GETS
router.get('/', (req, res)=>{
    contenedor.getAll().then(result=>{
        res.status(200).send(result.products)
    })
})

router.get('/:id',(req,res)=>{
    let id= parseInt(req.params.id);
    contenedor.getById(id).then(result=>{
        res.send(result.object);
    })
})


// POSTS

router.post('/', upload.single('image'),(req,res)=>{
    let product = req.body;
    product.price = parseInt(product.price);
    let thumbnail = 'http://localhost:8080/imagenes/'+req.file.filename;
    product.thumbnail = thumbnail;
    contenedor.save(product).then(result=>{
        res.send(result);
    })
})


// PUTS

router.put('/:id', upload.single('image'),(req,res)=>{
    let body = req.body;
    let id = parseInt(req.params.id);
    let thumbnail = 'http://localhost:8080/imagenes/'+req.file.filename
    body.thumbnail = thumbnail;
    contenedor.updateProduct(id,body).then(result=>{
        res.send(result);
    })
})


//DELETES

router.delete('/:id', (req,res)=>{
    let id= parseInt(req.params.id);
    contenedor.deleteById(id).then(result=>{
        res.send(result)
    })
})

module.exports = router;