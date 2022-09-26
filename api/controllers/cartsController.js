const { sequelize } = require('../../database/models');
const db = require('../../database/models')

let responseSent = false;


const createCart = userId => {
    db.carts.create({
        userId
    }).then(r => {
        return r;
    }).catch(err => console.log(err))

    //falta chequear
}
const cartById = (req, res) => {
    const { id } = req.dataToken;

    try {
        db.carts.findByPk(id).then(r => {
            return res.status(200).json(r);
        }).catch(err => console.log(err))
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const editCart = async (req, res) => {
    const { id } = req.dataToken;
    const cart = req.body.cart;
    await db.carts_has_products.destroy({
        where: {
            carts_id: id
        }
    });
    try {
        cart.forEach(c => {
            db.carts_has_products.create({
                product_id: c.product,
                carts_id: id,
                quantity: c.quantity
            })
        });
        res.status(200).json({
            msg: 'Cart updated'});
    }catch(err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        })
    } 
    
}

module.exports = { cartById, editCart };