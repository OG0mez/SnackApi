/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('likes', {
		id: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			primaryKey: true
		},
		_like: {
			type: DataTypes.INTEGER(1),
			allowNull: true
		},
		id_products: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			references: {
				model: 'products',
				key: 'id'
			}
		},
		id_users: {
			type: DataTypes.INTEGER(11).UNSIGNED,
			allowNull: false,
			references: {
				model: 'users',
				key: 'id'
			}
		}
	}, {
		tableName: 'likes',
		timestamps: false
	});
};
