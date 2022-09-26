module.exports = (sequelize, DataTypes) => {
	const alias = "users";
	const cols = {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true,
		},
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
        },
        first_name:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        password:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        profile_pic:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        role:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },
		last_name:{
            type: DataTypes.STRING(255),
            allowNull: false,
        },username:{
            type: DataTypes.STRING(255),
            allowNull: false,
        }
	};
	const config = {
		timestamps: false
	}


	const User = sequelize.define(alias, cols,config);
    
	User.associate = (models) => {
		User.hasOne(models.carts, {
			foreignKey: "user_id",
		});
	};
	return User;
};
