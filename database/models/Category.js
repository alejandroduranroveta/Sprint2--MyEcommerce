module.exports = (sequelize, DataTypes) => {
	const alias = "category";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING(255),
			allowNull: false,
			unique: true
		}
	};
	const config = {
		tableName: alias,
		timestamps: false
	}
	const Category = sequelize.define(alias, cols, config);
	Category.associate = (models) => {
		Category.hasMany(models.products, {
			foreignKey: 'category_id'
		})
	}
	return Category;
};
