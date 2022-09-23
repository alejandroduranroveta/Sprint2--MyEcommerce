const fs = require("fs");
const path = require("path");
const db = require("../../database/models");

const picturesController = {
	detail: async (req, res) => {
		//detalle de picture por id
		try {
			const id = req.params.id;
			if (isNaN(id)) {
				return res.status(400).json({ msg: "el id debe ser un número" });
			}

			const pic = await db.pictures.findByPk(id);

			if (!pic) {
				return res.status(404).json({ msg: "no hay picture con esa id" });
			} else {
				return res.status(200).json({ pic });
			}
		} catch (error) {
			console.log(error);
			return res.status(500).json({ error });
		}
	},

	create: async (req, res) => {
		//agregar una nueva imagen a la bd
		try {
			const { img, description } = req.body;
			const product_id = req.params.id;
			if (!img) {
				res.status(400).json({ msg: "La url de la imagen es obligatorio" });
			}
			if (isNaN(product_id) || product_id <= 0) {
				return res.status(400).json({ msg: "el id debe ser un número válido" });
			}

			const pic = await db.pictures.create({
				img,
				description,
				product_id,
			});

			res.status(201).json({ pic });
		} catch (error) {
			return res.status(500).json({ msg: "error al crear imagen", error });
		}
	},

	modify: async (req, res) => {
		// modificar pictures sprint 2

		try {
			const id = req.params.id;
			if (isNaN(id)) {
				return res.status(400).json({ msg: "el id debe ser un número" });
			}

			const { img, description, product_id } = req.body;

			if (!img) {
				return res.status(400).json({ msg: "es obligatorio ingresar url de imagen" });
			}
			if (!product_id) {
				return res.status(400).json({
					msg: "es obligatorio el id de producto asociado a la imagen",
				});
			}

			const picMod = await db.pictures.update(
				{
					img,
					description,
					product_id,
				},
				{
					where: {
						id,
					},
				}
			);

			return (picMod != 0) ? res.status(200).json({
						img,
						description,
						product_id,
				  })
				: res.status(400).json({
						msg: "Ninguna imagen fue modificada. compruebe que el id sea correcto",
				  });
		} catch (error) {
			return res.status(500).json({ msg: "error al modificar imagen", error });
		}
	},

	deleted: async (req, res) => {
		try {
			const id = req.params.id;

			const picDel = await db.pictures.destroy({
				where: {
					id,
				},
			});

			return res.status(200).json({ picDel }); //muestro la imagen eliminada
		} catch (error) {
			return res.status(500).json({
				msg: "error al modificar imagen",
				error,
			});
		}
	},
  

	picturesProduct: async (req, res) => {

  //por ruta products/id/pictures
    const id = req.params.id;
    if(id){ 
    if (isNaN(id)) {
      return res.status(400).json({ msg: "el id debe ser un número" });
    }

		try {
			const pics = await db.pictures.findAll({
				attributes: ["img", "description", "product_id"],
				where: {
					product_id: id,
				},
			});
			return res.status(200).json({ pics }); //devuelve todas las imagenes pertenecientes a un producto

		} catch (error) {
			return res.status(500).json({ error });
		}
  }


  //busqueda por ?product=id
    const product_id = req.query.product;
    if(product_id){ // si recibe algo por query
      if (isNaN(product_id)) {
				return res.status(400).json({ msg: "el id debe ser un número" });
			}

      try {
        const pics = await db.pictures.findAll({
          attributes: ["img", "description", "product_id"],
          where: {
            product_id
          },
        });
        return res.status(200).json({ pics }); //devuelve todas las imagenes pertenecientes a un producto
  
      } catch (error) {
        return res.status(500).json({ error });
      }
    }
  }

};
module.exports = picturesController;
