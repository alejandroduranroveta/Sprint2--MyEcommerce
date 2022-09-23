const fs = require("fs");
const { resolve } = require("path");
const path = require("path");
const db = require("../../database/models");

const picturesController = {
	detail: (req, res) => {
		//picture segun id
		//sprint 2
		const product_id = req.params.product_id;

		db.product
			.findAll(
				{
					attributes: ["img", "description"],
				},
				{
					where: {
						product_id,
					},
				}
			)
			.then((result) => {
				console.log(result);
				return res.send(result);
			})
			.catch((error) => {
				console.log(error);
				return res.send("no existe ninguna imagen para ese producto");
			});
	},

	create: (req, res) => {
		//agregar una nueva imagen a la bd
		//sprint 2
		const { img, description } = req.body;

		if (!img) {
			res.send("La url de la imagen es obligatorio");
		}

    let product_id;
		try {
			product_id = Number(req.params.product_id);
		} catch (error) {
      console.log(error);
			return res.send("el id debe ser un número");
		}

		db.picture
			.create({
				id: "default",
				img,
				description,
        product_id
			})
			.then(() => {
				res.send("Imagen creada con éxito.");
			})
			.catch((err) => {
				res.send("error al crear imagen");
				console.log(err);
			});
	},

	modify: (req, res) => {
    // modificar pictures sprint 2
      const id = req.params.id;


    //modificar pictures sprint 1
		//const id = req.params.id;
		try {
			const db = JSON.parse(
				fs.readFileSync(
					path.resolve(__dirname, "../data/pictures.json"),
					"utf8"
				)
			);
			let picture = db.filter((el) => el.id == id);
			if (picture) {
				let data = req.body;
				data.id = req.params.id;
				if (data.url) picture[0].url = data.url;
				if (data.description) picture[0].description = data.description;

				fs.writeFileSync(
					path.resolve(__dirname, "../data/pictures.json"),
					JSON.stringify(db)
				);
				res.status(200).json(data);
			} else {
				return res.status(404).json({
					status: "error",
					msg: "Imagen no encontrada",
				});
			}
		} catch (error) {
			res.status(500).json({
				status: "Error",
				msg: "Error en el servidor",
			});
		}
	},
	deleted: (req, res) => {
		const { id } = req.params;
		try {
			const db = JSON.parse(
				fs.readFileSync(
					path.resolve(__dirname, "../data/pictures.json"),
					"utf8"
				)
			);
			const pictureDeleted = db.find((el) => el.id === Number(id));
			const newData = db.filter((el) => el.id !== Number(id));
			fs.writeFileSync(
				path.resolve(__dirname, "../data/pictures.json"),
				JSON.stringify(newData)
			);
			return pictureDeleted
				? res.status(200).json(pictureDeleted)
				: res.status(404).json({ msg: "Imagen no encontrada" });
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: "Error",
			});
		}
	},
	picturesProduct: (req, res) => {
		try {
			let data = JSON.parse(
				fs.readFileSync(
					path.resolve(__dirname, "../data/products.json"),
					"utf8"
				)
			);
			//products/id/pictures
			let dataToShow;
			if (req.params.id) {
				const { id } = req.params;
				dataToShow = data.find((elm) => elm.id === Number(id));
			}

			if (req.query.product) {
				//busqueda por ?product=id
				const { product: queryID } = req.query;
				dataToShow = data.find((elm) => elm.id === Number(queryID));
			}

			if (dataToShow) {
				return res.status(200).json(dataToShow["gallery"]);
			} else {
				return res.status(404).json({
					msg: "Producto no encontrado",
				});
			}
		} catch (error) {
			console.log(error);
			res.status(500).json({
				msg: "Server Error",
			});
		}
	},
};
module.exports = picturesController;
