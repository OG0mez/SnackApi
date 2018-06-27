var SequelizeAuto = require('sequelize-auto')
var auto = new SequelizeAuto('snack', 'root', 'root',{
    additional : {
        timestamps: false
    }
});
 
auto.run(function (err) {
  if (err) throw err;
 
  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});
 