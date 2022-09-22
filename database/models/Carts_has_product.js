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
    
	return Carts_has_product;
};
