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
    //shows products by order
    app.get('/products',(req,res)=>{
        
        db.ShowProducts().then(result => {
            res.status(200).send(JSON.stringify(result))
        })
    }),
    //change the availability of the products
    app.patch('/products/availability',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            res.send('im logged in and also im an admin')
        }else{
            res.send('im not an admin')
        }
        
    }),
    //buys a product
    app.post('/products',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        res.send('im logged in')
        console.log(req.body)
        
    }),
    //adds a product
    app.post('/product/add',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        console.log(admin)
        if(admin === 1){
            db.addProduct(req.body).then(result => {
                res.status(201).res.send('product added')
            }).catch(error =>{
                res.status(400)
            })
        }else{
            res.status(401)
        }
        
    }),
    //change the price of a product
    app.patch('/product/patch/:id',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            let id = req.params.id;
            let price = req.body.price
            db.modifyPrice(id,price).then(result => {
                res.status(204)
            }).catch(error => {
                res.status()
            })
        }else{
            res.send('im not an admin')
        }
        
    }),
    //deletes a product
    app.delete('/product/delete/:id',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        let admin = req.user.dataValues.admin;
        if(admin === 1){
            res.send('im logged in and also im an admin')
        }else{
            res.send('im not an admin')
        }
        
    }),
    app.patch('/product/favorite/:id',j.passport.authenticate('jwt',{session:false}),(req,res) =>{
        res.send('im logged in')
    })

}