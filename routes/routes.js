const _ = require('../db/db.js')


module.exports = (app) => {
    //required for authentication
    app.post('/login',(req,res)=>{

    }),
    //shows products by order
    app.get('/products',(req,res)=>{
        
        _.ShowProducts().then(result => {
            res.status(200).send(JSON.stringify(result))
        })
    }),
    //change the availability of the products
    app.patch('/products/availability',(req,res)=>{
            res.status(204)
    }),
    //buys a product
    app.post('/products',(req,res)=>{
        res.status(201)
    }),
    //adds a product
    app.post('product/add/:id',(req,res)=>{
        res.status(201)
    }),
    //change the price of a product
    app.patch('product/patch/:id',(req,res)=>{
        res.status(204)
    }),
    //deletes a product
    app.delete('product/delete/:id',(req,res)=>{
        res.status(204)
    }),
    app.patch('product/favorite/:id',(req,res)=>{
        res.status(204)
    })

}