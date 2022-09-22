const fs = require("fs");
const path = require("path");
const generateJWT = require('../helpers/generateJWT');


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
	list: (req, res) => {
		try {
			const bdUser = fs.readFileSync(
				path.join(__dirname, "/../data/users.json"),
				"utf-8"
			);
			const users = JSON.parse(bdUser);
			users.map(user=>delete(user.password));
			res.status(200).json(users);
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: "Error Database",
			});
		}
	},
	searchById: (req, res) => {
		try {
			const bdUser = fs.readFileSync(
				path.join(__dirname, "/../data/users.json"),
				"utf-8"
			);
			let users = JSON.parse(bdUser);
			let user = users.find((e) => e.id === Number(req.params.id));
			users.map(user=>delete(user.password));
			user
				? res.status(200).json(user)
				: res.status(404).json({ msg: "Not fund user" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Error server" });
		}
	},
	createUser: (req, res) => {
		try {
			let {
				id,
				email = "exaple@gmail.com",
				username = "pepito",
				password = "1234",
				firtsname = "Anonymous",
				lastname = "Anonymous",
				profilepic = "www.img.com",
				role = "Guest"
			} = req.body;

			if(!id){
				return res.status(400).json({
					msg: 'Se requiere id'
				})
			}
			
			let newUser = {
				id,
				email,
				username,
				password,
				firtsname,
				lastname,
				profilepic,
				role
			};
			const bdUser = fs.readFileSync(
				path.join(__dirname, "/../data/users.json"),
				"utf-8"
			);
			let users = JSON.parse(bdUser);
			users.push(newUser);
			fs.writeFileSync(
				path.join(__dirname, "/../data/users.json"),
				JSON.stringify(users)
			);
			console.log(req.method);
			req.method === "POST"
				? res.status(201).json(newUser)
				: res
						.status(400)
						.json({ msg: "You need use POST method for create user" });
		} catch (error) {
			console.log(error);
			res.status(500).json({ msg: "Error server" });
		}
	},
	modifyUser: (req, res) => {
		try {
			let id = req.params.id;
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
