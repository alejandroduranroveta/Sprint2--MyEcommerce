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
        timestamps: true,
        createdAt: false,
    }


	const Cart = sequelize.define(alias, cols,extra);
    
	Cart.associate = (models) => {
		Cart.hasMany(models.carts_has_product, {
			as: "carrito",
			foreignKey: "id",
		});
	};
    
	return Cart;
};
