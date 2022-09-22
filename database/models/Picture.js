module.exports = (sequelize, DataTypes) => {
	const alias = "pictures";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        img:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        },
        gallery_id:{
            type: DataTypes.INTEGER,
            allowNull: false,
        }
	};


	const Picture = sequelize.define(alias, cols);
    
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

	return Picture;
};