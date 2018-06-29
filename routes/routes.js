const db = require('../db/db.js')
const jwt = require('jsonwebtoken');
const j = require('../auth/auth.js');

module.exports = (app) => {
    //required for authentication
    app.post('/login',(req,res)=>{
        db.findUser(req.body.user,req.body.password)
        .then(result => {
            if(result === null){
                res.status(401).json({message:"no such user found"})
            }else{
               let payload = {
                   id: result.dataValues.id,
               }
            let token = jwt.sign(payload,j.jwtOptions.secretOrKey);
            res.json({message: "ok", token: token});
            }
        }).catch(error => {
            res.status(401)
        })
    }),
    app.post('/signup',(req,res) =>{
        db.addUser(req.body).then(result => {
            res.status(200).send('user added')
        }).catch(error =>{ 
            res.status(400).send(error);
        })
    }),
    app.post('/admin',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
           db.addAdmin(req.body).then(result=> {
               res.status(200).send('user added')
           }).catch(error => {
               res.status(400).send(error)
           })
        }else{
            res.status(403).send('admin privileges required')
        }
        
    }),
    //shows products by order
    app.get('/products',(req,res)=>{
        if(req.query.limit && req.query.offset){
        var limit = Number(req.query.limit);
        var offset = Number(req.query.offset)
        }
        db.ShowProducts(limit,offset).then(result => {
            res.status(200).send(JSON.stringify(result))
        })
    }),
    //change the availability of the products
    app.patch('/products/:id/availability',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            let id = req.params.id;
            let av = req.body.aviability
            db.changeProductAv(id,av).then(result => {
                res.status(204)
            }).catch(error => {
                res.status(400)
            })
        }else{
            
        }
        
    }),
    //buys a product
    app.post('/products',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        res.send('im logged in')
        console.log(req.body)
        
    }),
    //adds a product
    app.post('/product',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        console.log(admin)
        if(admin === 1){
            db.addProduct(req.body).then(result => {
                res.status(201).res.send('product added')
            }).catch(error =>{
                res.status(400).send(error)
            })
        }else{
            res.status(403).send('admin privileges required')
        }
        
    }),
    //change the price of a product
    app.patch('/product/:id',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            let id = req.params.id;
            let price = req.body.price
            db.modifyPrice(id,price).then(result => {
                res.status(204).send(result)
            }).catch(error => {
                res.status(400).send(error)
            })
        }else{
            res.status(403).send('you dont have admin privileges')
        }
        
    }),
    //deletes a product
    app.delete('/product/:id',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            var id =Number(req.params.id)
            
          db.deleteProduct(id)
          

        }else{
           res.status(403).send('you dont have admin privileges')
        }
        
    }),
    app.patch('/product/:id/favorite',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        res.send('im logged in')
    })

}