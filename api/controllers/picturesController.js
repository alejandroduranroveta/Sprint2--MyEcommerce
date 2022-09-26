const db = require("../../database/models");

const picturesController = {
  detail: async (req, res) => {
    //detalle de picture por id, por ruta '/products/:id'
    try {
      const id = req.params.id;
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "El id debe ser un número válido." });
      }

      const pic = await db.pictures.findByPk(id);

      if (!pic) {
        return res.status(404).json({ msg: "No hay ninguna imágen con esa id." });
      } else {
        return res.status(200).json({ msg: "Imágen encontrada: ", pic });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Error interno al intentar buscar imágen.", error });
    }
  },

  create: async (req, res) => {
    //crear imagen por ruta '/products'
    try {
      const { img, description, product_id } = req.body;
      if (!img) {
        res.status(400).json({ msg: "La url de la imágen es obligatorio." });
      }
      if (isNaN(product_id) || product_id <= 0) {
        return res.status(400).json({ msg: "Falta 'product_id' o debe ser un número válido." });
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
      return res.status(500).json({ msg: "Error interno al intentar crear imagen", error });
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
        return res.status(400).json({ msg: "Es obligatorio ingresar la url de la imágen" });
      }
      if (!product_id) {
        return res.status(400).json({msg: "Es obligatorio el id de producto asociado a la imágen."});
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
        msg: "Imágen modificada correctamente.",
        img,
        description,
        product_id,
      }) : res.status(400).json({
        msg: "Ninguna imágen fue modificada, compruebe que el id sea correcto."});

    } catch (error) {
      return res.status(500).json({ msg: "Error interno al intentar modificar imágen.", error });
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
        msg: "Imágen eliminada correctamente.",
        picDel
      }) : res.status(400).json({ msg: "No se pudo eliminar la imágen."});

    } catch (error) {
      return res.status(500).json({
        msg: "Error interno al intentar eliminar la imágen.",
        error,
      });
    }
  },

  picturesProduct: async (req, res) => {
    // listar imagenes asociadas a un id de producto por ruta '/products/:id/pictures'
    const id = req.params.id;
    if (id) {
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "El id debe ser un número válido." });
      }

      try {
        const pics = await db.pictures.findAll({
          attributes: ["img", "description", "product_id"],
          where: {
            product_id: id,
          },
        });

        return res.status(200).json({ msg: "Imágenes encontradas:", pics });

      } catch (error) {
        return res.status(500).json({ msg: "Error interno al intentar listar imágenes.", error });
      }
    }


    //busqueda por query 'products/?product_id=id'
    const product_id = req.query.product;
    if (product_id) {
      if (isNaN(product_id) || id <= 0) {
        return res.status(400).json({ msg: "El id debe ser un número válido." });
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
        return res.status(500).json({ msg: "Error interno al listar imágenes.", error });
      }
    }
  }

};
module.exports = picturesController;
