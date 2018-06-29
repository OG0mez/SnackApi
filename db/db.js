'use strcit'
require('dotenv').config({
  path: '../.env'
});

const Sequilize = require('sequelize');
const DB_NAME = process.env.DB_NAME;
const HOST = process.env.HOST;
const USER = process.env.DB_USER;
const PASSWORD = process.env.DB_PASSWORD;


const connection = new Sequilize(DB_NAME, USER, PASSWORD, {
  host: HOST,
  dialect: 'mysql',
  operatorsAliases: false
})



const Products = connection.import('./models/products.js');
const Users = connection.import('./models/users.js');
const Likes = connection.import('./models/users.js');



const findUser = (user, password) => {
  return Users.findOne({
    attributes: [
      "id"
    ],
    where: {
      user: user,
      pass: password
    }
  }).then(result => result)
    .catch(error => error)
}


const ShowProducts = (page,range) => {
  return Products.findAll({
    where: {aviable : 1 },
    attributes: [
      ['product_name', 'Name'],
      ['brand', 'Brand'],
      ['price', 'Price'],
      ['like_count', 'Likes']
    ],
    limit : page,
    offset : range,
    order : Sequilize.literal('product_name')
  }).then(result => result)
    .catch(error => error);
}

const deleteProduct = (id) =>{
 Products.findById(id).then(result =>{
   if(result !== null){
    result.destroy();
    console.log('product deleted')
    return true
   }else{
     console.log('product not found')
     return false
   }
  
 })
}
const addProduct = (obj) => {
 return  Products.create({
    product_name : obj.name,
    brand : obj.brand,
    price : obj.price,
    quantity : obj.quantity,
    like_count : obj.likes,
    aviable : obj.aviable
  }).then(result => result)
    .catch(error => error)
}

const modifyPrice = (id,price) => {
 return Products.update({
    price
  },{where: {id}}).then(result => result)
                  .catch(error => error)
}

const addUser = (obj) =>{
  return Users.create({
    user : obj.username,
    pass : obj.password,
    is_admin : false
  }).then(result => result)
    .catch(error => error)
}

const changeProductAv = (id,av) => {
  return Products.update({
      aviable: av
  },{where : {id}}).then(result => result)  
                    .catch(error => error)
}



const addAdmin = (obj) => {
  return Users.create({
    user : obj.username,
    pass : obj.password,
    is_admin : obj.admin
  }).then(result => result)
    .catch(error => error )
}

module.exports = {
  ShowProducts,
  Users,
  findUser,
  addProduct,
  modifyPrice,
  addUser,
  addAdmin,
  changeProductAv,
  deleteProduct
}


