const cartsController = require("./cartsController");


//sacar estas dos de json
const fs = require("fs");
const path = require("path");

const db = require('../../database/models');
const { NUMBER } = require("sequelize");


const productsController = {
  list: async (req, res) => {
     try {
  //     if (req.query.category) {
  //       //busqueda por categoria
  //       const { category } = req.query;
  //       const search = category.toLowerCase();

  //       let data = JSON.parse(
  //         fs.readFileSync(
  //           path.resolve(__dirname, "../data/products.json"),
  //           "utf8"
  //         )
  //       );
  //       let product = data.filter((el) => {
  //         return el.category.toLowerCase().includes(search);
  //       });

  //       if (!product) {
  //         res.send(product);
  //       }
  //       return res.status(200).json(product);
  //     }
  //     //busqueda product
  //     if (req.query.q) {
  //       let { q } = req.query;
  //       let search = q.toLowerCase();
  //       const db = JSON.parse(
  //         fs.readFileSync(
  //           path.resolve(__dirname, "../data/products.json"),
  //           "utf8"
  //         )
  //       );
  //       let product = db.filter((p) => {
  //         return (
  //           p.title.toLowerCase().includes(search) ||
  //           p.description.toLowerCase().includes(search) ||
  //           p.category.toLowerCase().includes(search)
  //         );
  //       });
  //       if (product.length == 0) {
  //         return res.status(200).json({
  //           msg: "No hay productos para su búsqueda",
  //         });
  //       }
  //       return res.status(200).json(product);
  //     }//listado de Productos 

  //      else {
          let list = await db.products.findAll()
          res.status(200).json(list)

  //       return res.status(200).json(db);
  //     }
        }catch (error){
          console.log(error)
          res.status(500).json({
            msg:"Error Database"
          })
        }
  // },

//   detail: (req, res) => {
//     //Producto segun id
//     const id = req.params.id;
//     try {
//       const db = JSON.parse(
//         fs.readFileSync(
//           path.resolve(__dirname, "../data/products.json"),
//           "utf8"
//         )
//       );
//       const dataToShow = db.find((elm) => elm.id === Number(id));

//       if (!dataToShow) {
//         return res.status(404).json({
//           msg: "Not found",
//         });
//       }
//       res.send(dataToShow);
//     } catch (error) {
//       res.status(500).json({
//         msg: "Server Error",
//       });
//     }
      },
  create:async (req, res) => {
    //agregar un nuevo producto a la bd
    let {title = "un Titulo",description = "unaDescr",price = 50,category_id =100, most_wanted = 0, stock = 1} = req.body;
    if ((!title)||(!price)) {
      return res.status(400).json({ msg: "Para crear el producto se necesitan mas datos"});
      
    } else {
      let newProduct = {
        title,description,price,category_id,most_wanted,stock};

      try {
         await db.products.create(newProduct)
          res.status(200).json(newProduct)
      } catch (error) {
        console.log(error);
        res.status(500).json({
          msg: "Server Error",
        });
      }
    }
  },
  modify:async (req, res) => {
    try {
      
      
      let searchById = await db.products.findByPk(req.params.id);
      if (searchById!=null) {
        let data = req.body;
        data.id = req.params.id;
        console.log(data.title)
        if (data.title!=null) searchById.dataValues.title = data.title;
        if (data.price!=null) searchById.dataValues.price = data.price;
        if (data.description!=null) searchById.dataValues.description = data.description;
        if (data.category!=null) searchById.dataValues.category_id = data.category;
        if (data.mostwanted!=null) searchById.dataValues.most_wanted = data.mostwanted;
        if (data.stock!=null) searchById.dataValues.stock = data.stock;
        //console.log(searchById.dataValues.title)
        await db.products.update({
          title:searchById.dataValues.title,
          price:searchById.dataValues.price,
          description:searchById.dataValues.description,
          category:searchById.dataValues.category_id,
          mostwanted:searchById.dataValues.most_wanted,
          stock:searchById.dataValues.stock},
          {where:{id:data.id}})

        res.status(200).json(searchById);
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

//   deleted: (req, res) => {
//     const { id } = req.params;

//     try {
//       const db = JSON.parse(
//         fs.readFileSync(
//           path.resolve(__dirname, "../data/products.json"),
//           "utf8"
//         )
//       );
//       const deletedProduct = db.find((p) => p.id == id);
//       const newData = db.filter((el) => el.id != Number(id));
//       fs.writeFileSync(
//         path.resolve(__dirname, "../data/products.json"),
//         JSON.stringify(newData)
//       );
//       cartsController.removeProductFromCart(id);
//       return res.status(200).json(deletedProduct);
//     } catch (error) {
//       console.log(error);
//       res.status(500).json({
//         msg: "Server Error",
//       });
//     }
//   },
// };
}
module.exports = productsController;
