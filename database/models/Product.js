module.exports = (sequelize, DataTypes) => {
	const alias = "products";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING(255),
			allowNull: false,
		},
		description: {
			type: DataTypes.STRING,
            allowNull: false,
		},
		category_id: { 
			type: DataTypes.INTEGER,
			allowNull: false,
		},
        price: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        stock: {
			type: DataTypes.INTEGER,
            allowNull: false,
        },
		most_wanted: {
			type: DataTypes.INTEGER(1),
			allowNull: false,
		}
	};
	const Product = sequelize.define(alias, cols);
	Product.associate = (models)=>{
		Product.hasMany(models.pictures,{foreignKey:'product_id'})
		Product.belongsTo(models.category,{
			foreignKey:'category_id',
			as: 'categoryProduct'
	})
	}
	return Product;
};
