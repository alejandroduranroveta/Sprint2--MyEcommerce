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
        }

	};


	const Carts_has_product = sequelize.define(alias, cols);
    
	Carts_has_product.associate = (models) => {
		Carts_has_product.BelongsTo(models.Cart, {
			as: "Carts_has_product",
			foreignKey: "carts_id",
		});
	};
    
	return Carts_has_product;
};
