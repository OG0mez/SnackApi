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
      "id",
      ["is_admin", "admin"]
    ],
    where: {
      user: user,
      pass: password
    }
  }).then(result => result)
    .catch(error => error)
}

const ShowProducts = () => {
  return Products.findAll({
    attributes: [
      ['product_name', 'Name'],
      ['brand', 'Brand'],
      ['price', 'Price'],
      ['like_count', 'Likes']
    ]
  }).then(result => result)
    .catch(error => error);
}



module.exports = {
  ShowProducts,
  findUser,
  Users
}

