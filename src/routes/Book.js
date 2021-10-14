const express = require('express');
const router = express.Router();

//importar modulo de conexión a BD
const myconnection = require('../database');

//obtener datos en una ruta inicial
router.get('/lista',(req,res) => {
    myconnection.query('select * from library.book',(err,rows,fields ) =>{
        if(!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    });
});

// Ver detalle del libro seleccionado
//creación de nueva ruta para consulta
router.get('/:id',async (req,res)=>{
    // valor a obtener de parametros,ruta
    const {id} = req.params;
    const query = 'select bookid,title,year_publication,editorial,category,place,author from library.book b join library.author a on b.authorid = a.authorId where b.bookid = ?'
    await myconnection.query(query,[id],(err,rows,fields) => {
        if(!err){
            if (!rows[0])
            {
                res.send('Book Not found');
            }
            else {
                res.json(rows[0]);
            }            
        }
        else{
            res.status(404).json({VAlor:'Not Found'});
            //console.log(err);
        }
    })
});

//Creación de nueva ruta para insert
router.post('/',async (req,res) =>{
    //obtener valores
    const{id,author,title,year,editorial,category,place} = req.body;
    const query = `insert into library.book values (?,?,?,?,?,?,?);`;
    //Enviar insert y esperar a que termine
    await myconnection.query(query,[id,author,title,year,editorial,category,place],(err,rows,fields) =>{
        if(!err){
            // datos insertados
            const newbook = {...req.body}
            res.json(newbook);
        }
        else {
            res.status(405).json({error:'Bad request'});
            //console.log(err);
        }
    });
});
// ruta para modificar datos
router.put('/:id',async (req,res) => {
    const {id} = req.params;
    const query = 'select bookid from library.book b join library.author a on b.authorid = a.authorId where b.bookid = ?'
    await myconnection.query(query,[id],(err,rows,fields) => {
        if(!err){
            if (!rows[0])
            {
                res.send('404 Book Not found');
            }
            else {
                const {author} = req.body;
                const queryupdate = 'update library.author a join library.book b on a.authorid = b.authorid set author = ? where b.bookid = ?;';
                //Enviar consulta y esperar a que termine
                myconnection.query(queryupdate,[author,id],(err,rows,fields)=>{
                    if(!err){

                        res.json({status: '200 Success Book updated'});
                        //console.log("200 Succes");
                    }
                    else {
                        res.status(404).json({error:'Not Found'});
                    }
                });
            }            
        }
        else{
            res.status(404).json({Valor:'Not Found'});
            //console.log(err);
        }
    })
});

// ruta para eliminar
router.delete('./id',(req,res)=>{
    const {id} = req.params;
    const query = 'delete from library.book where bookid = ?'
    myconnection.query(query,[id],(err,rows,fields)=>{
        if(!err){
            res.json({status: 'Book deleted'});
        }
        else{
            res.status(404).json({error:'Not Found'});
        }
    });
});
//exportar modulo
module.exports = router;
