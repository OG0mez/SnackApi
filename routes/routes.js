const _ = require('../db/db.js')


module.exports = (app) => {

    app.get('/products',(req,res)=>{
        
        _.ShowProducts().then(result => {
            res.status(200).send(JSON.stringify(result))
        })
    })

}