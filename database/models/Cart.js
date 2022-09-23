module.exports = (sequelize, DataTypes) => {
	const alias = "carts";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }

	};
	const extra = {
        timestamps: false
    }


	const Cart = sequelize.define(alias, cols,extra);
    
	Cart.associate = (models) => {
		Cart.hasMany(models.carts_has_products, {
			as: "carrito",
			foreignKey: "carts_id",
		});
	};
    
	return Cart;
};
