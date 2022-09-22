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


	const Cart = sequelize.define(alias, cols);
    
	// Equipo.associate = (models) => {
	// 	Equipo.hasMany(models.Persona, {
	// 		as: "personaequipo",
	// 		foreignKey: "equipo_id",
	// 	});
	// 	Equipo.belongsToMany(models.Marca, {
	// 		as: "marcaequipo",
	// 		through: "equipo_marca",
	// 		foreignKey: "equipo_id",
	// 		otherKey: "marca_id",
	// 	});
	// };
    
	return Cart;
};
