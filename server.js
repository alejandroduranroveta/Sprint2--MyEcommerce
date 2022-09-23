const express = require("express");
const { sequelize } = require('./database/models');
const app = express();
const productRoutes = require("./api/routes/productRoutes.js");
const userRoutes = require("./api/routes/userRoutes");
const cartsRoutes = require("./api/routes/cartRoutes");
const picturesRoutes = require("./api/routes/picturesRoutes");

const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerDocument = YAML.load("./swagger.yaml");

app.use(express.json());

require("dotenv").config();
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/carts", cartsRoutes);
app.use("/api/v1/pictures", picturesRoutes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

		const PORT = process.env.PORT;

		sequelize.sync(/**{force: true} */).then(() => {
			console.log("sequelize iniciado");
		}).catch(err => {console.log("error: " + err)});

		app.listen(PORT, () =>{
			console.log("Se levanto el server en el puerto " + PORT);
		})
