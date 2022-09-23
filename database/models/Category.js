module.exports = (sequelize, DataTypes) => {
	const alias = "category";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        name:{
            type: DataTypes.STRING(255),
            allowNull: false,
            uniquer: true
        }
	};
	const config = {
		tableName: alias,
        timestamps: false
	}

<<<<<<< HEAD

	const Category = sequelize.define(alias, cols, config);
=======
	const Category = sequelize.define(alias, cols,config);
>>>>>>> main
    
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
    
	return Category;
};
