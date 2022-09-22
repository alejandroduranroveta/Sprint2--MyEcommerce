const cartsController = require("./cartsController");

const fs = require("fs");
const path = require("path");

const productsController = {
  list: (req, res) => {
    try {
      if (req.query.category) {
        //busqueda por categoria
        const { category } = req.query;
        const search = category.toLowerCase();

        let data = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../data/products.json"),
            "utf8"
          )
        );
        let product = data.filter((el) => {
          return el.category.toLowerCase().includes(search);
        });
        if (!product) {
          res.send(product);
        }
        return res.status(200).json(product);
      }
      if (req.query.q) {
        let { q } = req.query;
        let search = q.toLowerCase();
        const db = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../data/products.json"),
            "utf8"
          )
        );
        let product = db.filter((p) => {
          return (
            p.title.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search)
          );
        });
        if (product.length == 0) {
          return res.status(200).json({
            msg: "No hay productos para su búsqueda",
          });
        }
        return res.status(200).json(product);
      } else {
        const db = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../data/products.json"),
            "utf8"
          )
        );
        return res.status(200).json(db);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  },

  detail: (req, res) => {
    //Producto segun id
    const id = req.params.id;
    try {
      const db = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../data/products.json"),
          "utf8"
        )
      );
      const dataToShow = db.find((elm) => elm.id === Number(id));

      if (!dataToShow) {
        return res.status(404).json({
          msg: "Not found",
        });
      }
      res.send(dataToShow);
    } catch (error) {
      res.status(500).json({
        msg: "Server Error",
      });
    }
  },
  create: (req, res) => {
    //agregar un nuevo producto a la bd

    let {
      id,
      title = "",
      price = 0,
      description = "",
      image = "",
      gallery = [
        {
          picture_id: 1,
          picture_url: "" 
        }
      ],
      category = 0,
      mostwanted,
      stock,
    } = req.body;

    const condition = (!id || !title ||
    !price || !gallery[0].picture_id ||
    !gallery[0].picture_url);

    console.log(gallery[0].picture_id);
    if (condition) {
      return res.status(400).json({ msg: "Para crear el producto se necesitan mas datos"});
      
    } else {
      let newProduct = {
        id,
        title,
        price,
        description,
        image,
        gallery,
        category,
        mostwanted,
        stock,
      };

      try {
        const db = JSON.parse(
          fs.readFileSync(
            path.resolve(__dirname, "../data/products.json"),
            "utf8"
          )
        );
        db.push(newProduct);
        fs.writeFileSync(
          path.resolve(__dirname, "../data/products.json"),
          JSON.stringify(db)
        );
        res.status(200).json(newProduct);
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Server Error",
        });
      }
    }
  },

  modify: (req, res) => {
    const id = req.params.id;
    console.log(id);
    try {
      const db = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../data/products.json"),
          "utf8"
        )
      );
      let product = db.filter((el) => el.id == id);
      if (product) {
        let data = req.body;
        data.id = req.params.id;
        if (data.title) product[0].title = data.title;
        if (data.price) product[0].price = data.price;
        if (data.description) product[0].description = data.description;
        if (data.image) product[0].image = data.image;
        if (data.gallery.length > 0) product[0].gallery[0] = data.gallery;
        if (data.category) product[0].category = data.category;
        if (data.mostwanted) product[0].mostwanted = data.mostwanted;
        if (data.stock) product[0].stock = data.stock;

        fs.writeFileSync(
          path.resolve(__dirname, "../data/products.json"),
          JSON.stringify(db)
        );
        res.status(200).json(data);
      } else {
        return res.status(404).json({
          msg: "Not found",
        });
      }
    } catch (error) {
      res.status(500).json({
        msg: "Error",
      });
    }
  },
  mostwanted: (req, res) => {
    console.log("entro por mostwanted");
    try {
      const db = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../data/products.json"),
          "utf8"
        )
      );
      let products = db.filter((el) => el.mostwanted == true);

      if (products.length == 0) {
        res.send("No se encuentran resultados");
      } else {
        res.status(200).json(products);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  },

  deleted: (req, res) => {
    const { id } = req.params;

    try {
      const db = JSON.parse(
        fs.readFileSync(
          path.resolve(__dirname, "../data/products.json"),
          "utf8"
        )
      );
      const deletedProduct = db.find((p) => p.id == id);
      const newData = db.filter((el) => el.id != Number(id));
      fs.writeFileSync(
        path.resolve(__dirname, "../data/products.json"),
        JSON.stringify(newData)
      );
      cartsController.removeProductFromCart(id);
      return res.status(200).json(deletedProduct);
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  },
};
module.exports = productsController;
