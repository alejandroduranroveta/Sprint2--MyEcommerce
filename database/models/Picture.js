module.exports = (sequelize, DataTypes) => {
	const alias = "pictures";
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
		},
        img:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
        }
	};

	const config = {
		timestamps: false
	}
	
	const Picture = sequelize.define(alias, cols, config);

	Picture.associate = (models) => {
		Picture.belongsTo(models.products,{
			foreignKey: 'product_id',
			as: 'productPicture',
		})
	};

	return Picture;
};
