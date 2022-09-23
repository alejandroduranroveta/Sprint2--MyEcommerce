const cartsController = require("./cartsController");


//sacar estas dos de json
const fs = require("fs");
const path = require("path");

const db = require('../../database/models');
const { NUMBER } = require("sequelize");
const e = require("express");

const productsController = {
  list: async (req, res) => {
    try {
      //busqueda por categoria
      if (req.query.category) {
          const { category } = req.query;
          const search = category.toLowerCase();
          const searchCategory = await db.products.findAll({where:{category_id:category}}); 

      if (!searchCategory) {
          return res.status(200).json({
          msg: "No hay productos para su búsqueda",
          });
      }
      //busqueda product
      if (req.query.q) {
        let { q } = req.query;
        let search = q.toLowerCase();
        let product = db.filter((p) => {
        return (
            p.title.toLowerCase().includes(search) ||
            p.description.toLowerCase().includes(search) ||
            p.category.toLowerCase().includes(search));
          });
        if (product.length == 0) {
            return res.status(200).json({
              msg: "No hay productos para su búsqueda",
            });
          }else{
          return res.status(200).json(product);
        }
      //listado de Productos 
          let list = await db.products.findAll()
          res.status(200).json(list)
        }
      }
    
    }catch (error){
          console.log(error)
          res.status(500).json({
            msg:"Error Database"
          })
        }
  },
  detail:async (req, res) => {
    try {
      //Producto segun id
      let searchById = await db.products.findByPk(req.params.id);
      res.send(searchById.dataValues);
    } catch (error) {
      res.status(401).json({
        msg: "Not found product",
      });
    }
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
  modify:async(req, res) => {
    try {
      const searchById = await db.products.findByPk(req.params.id); 
      let {id,title,price,description,category_id,most_wanted,stock} = searchById
      let newProduct = {
        id,
        title:req.body.title,
        price:req.body.price,
        description:req.body.description,
        category_id:req.body.category_id,
        most_wanted:req.body.most_wanted,
        stock:req.body.stock
      }
      let idProducto= req.params.id
      await db.products.update(newProduct,{where:{id:idProducto}})

      res.json(newProduct)
    } catch (error) {
      res.status(500).json({
        msg: "Error",
      });
    }
  },
  mostwanted:async (req, res) => {
    console.log("entro por mostwanted");
    try {
      const searchMostWanted = await db.products.findAll({where:{most_wanted:true}}); 
      console.log(searchMostWanted);
      if (searchMostWanted.length == 0) {
        res.status(400).send('Not found products');
      } else {
        res.status(200).json(searchMostWanted);
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  },
  deleted:async (req, res) => {
    const { id } = req.params;

    try {
      const element = await db.products.findByPk(id);
      if(element){
        await element.destroy()
        return res.status(200).json(element);
      }else{
        res.status(401).json({
          msg: "Not found products",
        });
      }
      
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: "Server Error",
      });
    }
  }
};
module.exports = productsController;
