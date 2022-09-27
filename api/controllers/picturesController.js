const db = require("../../database/models");

const picturesController = {
  detail: async (req, res) => {
    //detalle de picture por id, por ruta '/products/:id'
    try {
      const id = req.params.id;
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "The id must be a valid number." });
      }

      const pic = await db.pictures.findByPk(id);

      if (!pic) {
        return res.status(404).json({ msg: "There is no image with this id." });
      } else {
        return res.status(200).json({ msg: "This images has been found:", pic });
      }
    } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal error when trying to find images.", error });
    }
  },

  create: async (req, res) => {
    //crear imagen por ruta '/products'
    try {
      const { img, description, product_id } = req.body;
      if (!img) {
        res.status(400).json({ msg: "The url of the image is required." });
      }
      if (isNaN(product_id) || product_id <= 0) {
        return res.status(400).json({ msg: "The 'product_id' is not found or must be a valid number" });
      }

      const pic = await db.pictures.create({
        img,
        description,
        product_id,
      });

      return (pic != 0) ? 
      res.status(201).json({
        msg: "Image has been created",pic}) : 
      res.status(500).json({
        msg: "Unexpected error when creating image."});

    } catch (error) {
      return res.status(500).json({ msg: "Internal error when trying to create images.", error });
    }
  },

  modify: async (req, res) => {
    //modificar imagen por ruta '/products/:id'
    try {
      const id = req.params.id;
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "The id must be a valid number." });
      }

      const { img, description, product_id } = req.body;

      if (!img) {
        return res.status(400).json({ msg: "The url of the image is required." });
      }
      if (!product_id) {
        return res.status(400).json({msg: "The product id associated with the image is required."});
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
        msg: "Image has been modified",
        img,
        description,
        product_id,
      }) : res.status(400).json({
        msg: "No image was modified, check that the id is correct."});

    } catch (error) {
      return res.status(500).json({ msg: "Internal error when trying to modify images.", error });
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
        msg: "Image has been deleted",
        picDel
      }) : res.status(400).json({ msg: "The image could not be deleted."});

    } catch (error) {
      return res.status(500).json({
        msg: "Internal error when trying to delete images.",
        error,
      });
    }
  },

  deletedByProduct: async (req, res, id) => {
    //eliminar imagenes desde products antes de eliminar un producto
  
    try {
      const picDel = await db.pictures.destroy({
        where: {
          id
        },
      });

    } catch (error) {
      return res.status(500).json({
        msg: "Internal error when trying to delete images.",
        error,
      });
    }
  },

  picturesProduct: async (req, res) => {
    // listar imagenes asociadas a un id de producto por ruta '/products/:id/pictures'
    const id = req.params.id;
    if (id) {
      if (isNaN(id) || id <= 0) {
        return res.status(400).json({ msg: "The id must be a valid number." });
      }

      try {
        const pics = await db.pictures.findAll({
          attributes: ["img", "description", "product_id"],
          where: {
            product_id: id,
          },
        });
        return res.status(200).json({ msg: "These images has been found", pics });

      } catch (error) {
        return res.status(500).json({ msg: "Internal error when trying to list images.", error });
      }
    }


    //busqueda por query 'products/?product_id=id'
    const product_id = req.query.product;
    if (product_id) {
      if (isNaN(product_id) || id <= 0) {
        return res.status(400).json({ msg: "The id must be a valid number." });
      }

      try {
        const pics = await db.pictures.findAll({
          attributes: ["img", "description", "product_id"],
          where: {
            product_id
          },
        });
        return res.status(200).json({ msg: "These images has been found", pics });

      } catch (error) {
        return res.status(500).json({ msg: "Internal error when trying to list images.", error });
      }
    }
  }

};
module.exports = picturesController;
