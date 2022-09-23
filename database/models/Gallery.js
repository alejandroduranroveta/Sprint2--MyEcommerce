module.exports = (sequelize, DataTypes) => {
	const alias = "gallery";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        product_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
		
	};
	const config = {
        tableName: alias,
        timestamps: false
    }

	const Gallery = sequelize.define(alias, cols,config);
    
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
    
	return Gallery;
};
