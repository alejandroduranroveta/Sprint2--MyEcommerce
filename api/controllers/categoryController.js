const db = require("../../database/models");
const categoryController ={
    list: async (req, res) => {
        try {
            const list = await db.category.findAll();
            if (list.length > 0) {
                res.status(200).json(list);
            }else{
                res.status(200).json({msg: "Category list is empty"});
            }
        } catch (errors) {
            res.status(500).json({msg: "Database error"});
            console.log(errors);
        }
    },
    create: async (req, res) => {
        try {
            const {name="Comida"} = req.body;
            const category ={
                name
            }
            const newCategory = await db.category.create(category);
            res.status(200).json(newCategory);
        } catch (errors) {
            console.log(errors);
            res.status(500).json({msg: "Error creating category"});
        }
    },
    delete: async (req, res) => {
        try {
            const {id} = req.params;
            const deletedCategory = db.category.findByPk(id);
            await db.category.destroy({where:{id}});
            if (id != null) {
				res.status(200).json(deletedCategory);
			} else if (!isNaN(id)) {
				res.status(404).json({ msg: "Not fund category" });
			} else {
				res
					.status(400)
					.json({
						msg: `'${id}' that is not a valid id, try with something else numerical`,
					});
			}
        }catch (err) {
            console.log(err);
            res.status(500).json({msg: "Error database"});
        }
    }
}
module.exports = categoryController;
