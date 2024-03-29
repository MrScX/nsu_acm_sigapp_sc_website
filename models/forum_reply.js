/* jshint indent: 1 */

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('forum_reply', {
		reply_id: {
			type: DataTypes.INTEGER(11),
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		reply_content: {
			type: DataTypes.TEXT,
			allowNull: false
		}
	}, {
		tableName: 'forum_reply'
	});
};
