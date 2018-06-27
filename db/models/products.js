/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('products', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		product_name: {
			type: DataTypes.STRING(25),
			allowNull: true
		},
		brand: {
			type: DataTypes.STRING(25),
			allowNull: true
		},
		price: {
			type: DataTypes.FLOAT,
			allowNull: true
		},
		quantity: {
			type: DataTypes.INTEGER(20),
			allowNull: true
		},
		like_count: {
			type: DataTypes.INTEGER(20),
			allowNull: true
		},
		aviable: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		}
	}, {
		tableName: 'products',
		timestamps: false
	});
};
