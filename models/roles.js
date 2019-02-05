/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('roles', {
		role_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		role_name: {
			type: DataTypes.STRING(45),
			allowNull: false
		}
	}, {
		tableName: 'roles'
	});
};
