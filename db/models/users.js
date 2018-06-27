/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		user: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		pass: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		auth: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};
