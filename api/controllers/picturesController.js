const db = require("../../database/models");

const picturesController = {
  detail: async (req, res) => {
    //detalle de picture por id, por ruta '/products/:id'
    try {
      const id = req.params.id;
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "el id debe ser un número válido" });
      }

      const pic = await db.pictures.findByPk(id);

      if (!pic) {
        return res.status(404).json({ msg: "no hay ninguna picture con esa id" });
      } else {
        return res.status(200).json({ msg: "imagen encontrada: ", pic });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "error interno al intentar buscar imagen", error });
    }
  },

  create: async (req, res) => {
    //crear imagen por ruta '/products'
    try {
      const { img, description, product_id } = req.body;
      if (!img) {
        res.status(400).json({ msg: "La url de la imagen es obligatorio" });
      }
      if (isNaN(product_id) || product_id <= 0) {
        return res.status(400).json({ msg: "falta product_id o debe ser un número válido" });
      }

      const pic = await db.pictures.create({
        img,
        description,
        product_id,
      });

      return (pic != 0) ? 
      res.status(201).json({
        msg: "Imagen creada con éxito",pic}) : 
      res.status(500).json({
        msg: "Error inesperado al crear imagen"});

    } catch (error) {
      return res.status(500).json({ msg: "error al crear imagen", error });
    }
  },

  modify: async (req, res) => {
    //modificar imagen por ruta '/products/:id'
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
        return res.status(400).json({msg: "es obligatorio el id de producto asociado a la imagen"});
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
        msg: "Imagen modificada correctamente",
        img,
        description,
        product_id,
      }) : res.status(400).json({
        msg: "Ninguna imagen fue modificada. compruebe que el id sea correcto"});

    } catch (error) {
      return res.status(500).json({ msg: "error al modificar imagen", error });
    }
  },

  deleted: async (req, res) => {
    //eliminar imagen por ruta '/products/:id'
    const id = req.params.id;
    try {
      const picDel = await db.pictures.destroy({
        where: {
          id
        },
      });

      return (picDel != 0) ? res.status(200).json({
        msg: "Imagen eliminada correctamente.",
        picDel
      }) : res.status(400).json({
        msg: "No se pudo eliminar la imagen"
      });

    } catch (error) {
      return res.status(500).json({
        msg: "error al eliminar la imagen",
        error,
      });
    }
  },

  picturesProduct: async (req, res) => {
    // listar imagenes asociadas a un id de producto por ruta '/products/:id/pictures'
    const id = req.params.id;
    if (id) {
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

        return res.status(200).json({ msg: "Imagenes encontradas:", pics });

      } catch (error) {
        return res.status(500).json({ msg: "Error interno al listar imágenes", error });
      }
    }


    //busqueda por query 'products/?product_id=id'
    const product_id = req.query.product;
    if (product_id) {
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
        return res.status(200).json({ msg: "Imágenes encontradas:", pics });

      } catch (error) {
        return res.status(500).json({ msg: "Error interno al listar imágenes", error });
      }
    }
  }

};
module.exports = picturesController;
