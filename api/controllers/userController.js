const fs = require("fs");
const path = require("path");

const  db  = require("../../database/models");


const userController = {
	login: async (req,res) => {
		try {
			const emptyCart = require('../helpers/emptyCart_Login');
			const {username, password} = req.body;
			const bdUser = fs.readFileSync(path.join(__dirname, "/../data/users.json"),"utf-8");
			const users = JSON.parse(bdUser);
			let user = users.find(user => user.username == username && user.password == password);
			if(user){
				delete(user.password);
				const token = await generateJWT (user)
				emptyCart(user.id);
				return res.status(200).json({
						success: true,
						message: "Authorized",
						user: {
						iduser: user.id,
						username: user.username
						},
						token				
					});
			}else{
				return res.status(401).json({
					msg: "Error en credenciales"
				})
			}
		} catch (error) {
			return res.status(500).json({ 
				msg: 'ok',
				error
			});
		}

	},
	list: async(req, res) => {
		try {
			const list = await db.users.findAll();
			res.status(200).json(list);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: "Error Database",
			});
		}
	},
	searchById: async (req, res) => {
		try {
			const searchById = await db.users.findByPk(req.params.id);
			if (searchById!=null) {
				let {id,email,name,profile_pic,role} =  searchById;
			const user = {
				id,
				name,
				email,
                profile_pic,
                role
			}
			res.status(200).json(user);
			} else if(!isNaN(req.params.id)) {
				res.status(404).json({ msg: "Not fund user" });
			}else{
				res.status(400).json({ msg: `${req.params.id} that is not a valid id, try with something else numerical`});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Error server:"});
		}
	},
	createUser: async (req, res) => {
		try {
			let {
				email = "exaple@gmail.com",
				name = "pepito",
				password = "1234",
				firtsname = "Anonymous",
				lastname = "Anonymous",
				profile_pic = "www.img.com",
				role = "Guest"
			} = req.body;
			
			let newUser = {
				email,
				name,
				password,
				firtsname,
				lastname,
				profile_pic,
				role
			};
			db.users.create(newUser);
			req.method === "POST"
				? res.status(201).json(newUser)
				: res
						.status(400)
						.json({ msg: "You need use POST method for create user" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: error });
		}
	},
	modifyUser: async (req, res) => {
		try {
			let id = req.params.id;
			if (id!==null) {
				let {
					email,
					username,
					firtsname,
					lastname,
					profilepic,
					role
				} = req.body;
				bd.user.update(

				);
			} else if(!isNaN(req.params.id)) {
				res.status(404).json({ msg: "Not fund user" });
			}else{
				res.status(400).json({ msg: `${req.params.id} that is not a valid id, try with something else numerical`});
			}



			if (id) {
				let bdUser = fs.readFileSync(
					path.join(__dirname, "/../data/users.json"),
					"utf-8"
				);
				let users = JSON.parse(bdUser);
				let usuariAmodificar = req.body;
				let usersAux = users.find((e) => e.id === Number(id));
				if (usersAux) {
					usersAux = users.filter((e) => e.id !== Number(id));
				} else {
					return res.status(404).json({
						msg: 'Usuario no encontrado'
					});
				}
				usersAux.push(usuariAmodificar);
				bdUser = fs.writeFileSync(
					path.join(__dirname, "/../data/users.json"),
					JSON.stringify(usersAux)
				);
				res.status(200).json({ usuariAmodificar });
			} else {
				return res.status(400);
			}
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	},
	delete: (req, res) => {
		try {
			let id = req.body.id;
			if (id) {
				let bdUser = fs.readFileSync(
					path.join(__dirname, "/../data/users.json"),
					"utf-8"
				);
				let users = JSON.parse(bdUser);
				let userDelete = users.find((e) => e.id === Number(id));
				if (userDelete) {
					let usersAux = users.filter((e) => e.id !== Number(id));
					bdUser = fs.writeFileSync(
						path.join(__dirname, "/../data/users.json"),
						JSON.stringify(usersAux)
					);
					res.status(200).json(userDelete);
				} else {
					return res.status(404);
				}
			}
		} catch (error) {
			console.log(error);
			res.status(500);
		}
	},
};

module.exports = userController;
