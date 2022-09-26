const { sequelize } = require('../../database/models');
const db = require('../../database/models');

const createCart = async username => {
    let user = await db.users.findOne({
        attributes: ["id"],
        where: {
            username
        }
    })
    console.log(user.id);

    await db.carts.create({
        user_id : user.id
    }).then(r => {
        return r;
    }).catch(err => console.log(err))
    //falta chequear
}

const removeCart = async userId => {
    await emptyCart(userId);

    await db.carts.destroy({
        where: {
            user_id : userId
        }
    })
}
const emptyCart = async userId =>{
    const cartId = getCartIdByUserId(userId);
    console.log(cartId);
    await db.carts_has_products.destroy({
        where: {
            cart_id: cartId
        }
    })
}

const getCartIdByUserId = async userId =>{
    const cartId = await db.carts.findOne({
        attributes: ['id'],
        where: {
            user_id : userId
        }
    })
    return Number(cartId)
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

const addToCart = (req, res) => {
    const { id } = req.dataToken;
    const {product, quantity} = req.body;
    const cartId = getCartIdByUserId(id);

    try{
        db.carts_has_products.create({
            product_id: product,
            carts_id: cartId,
            quantity: quantity
        }).then(r =>{
            res.status(200).json({
                msg: 'Item added'});
        })
    }catch(error){
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

module.exports = { cartById, editCart, createCart, removeCart};