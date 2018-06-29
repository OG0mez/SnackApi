/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('users', {
		user: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		pass: {
			type: DataTypes.STRING(25),
			allowNull: false
		},
		is_admin: {
			type: DataTypes.INTEGER(1),
			allowNull: false
		}
	}, {
		tableName: 'users',
		timestamps: false
	});
};
