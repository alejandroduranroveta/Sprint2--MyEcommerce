const Carts_has_product = require("./Carts_has_product");

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
		Cart.hasOne(models.carts_has_products, {
			foreignKey : 'carts_id'
		});
		Cart.belongsTo(models.users, {
			foreignKey: "user_id"
		})
	};
    
	return Cart;
};
