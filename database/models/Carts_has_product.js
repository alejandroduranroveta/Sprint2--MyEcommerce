module.exports = (sequelize, DataTypes) => {
	const alias = "carts_has_products";
	const cols = {
        products_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        carts_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
        },
        quantity:{
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        add_date:{
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: sequelize.NOW
        }

	};

    const config = {
        timestamps : false,
        createdAt: "add_date"
    }

	const Carts_has_product = sequelize.define(alias, cols, config);
    
	Carts_has_product.associate = (models) => {
		Carts_has_product.belongsTo(models.carts, {
			as: "Carts_has_product",
			foreignKey: "carts_id",
		});
        Carts_has_product.belongsTo(models.products, {
            foreignKey: "products_id",
            as: "productos",
        })
	};
    
	return Carts_has_product;
};
