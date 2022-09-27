const { sequelize } = require('../../database/models');
const db = require('../../database/models');

const createCart = async username => {
    let user_id = await getCartIdFromUsername(username);
    await db.carts.create({
        user_id
    }).then(r => {
        return r;
    }).catch(err => console.log(err))
}

const removeCart = async userId => {
    await emptyCart(userId);
    await db.carts.destroy({
        where: {
            user_id: userId
        }
    })
}

const getCartIdFromUsername = async username => {
    try {
        let user = await db.users.findOne({
            attributes: ["id"],
            where: {
                username
            }
        })
        return user.id;
    } catch (err) {
        console.log(err);
        return null;
    }

}

const emptyCart = async userId => {
    const carts_id = await getCartIdByUserId(userId);
    await db.carts_has_products.destroy({
        where: {
            carts_id
        }
    })
}

const getCartIdByUserId = async userId => {
    const cart = await db.carts.findOne({
        attributes: ['id'],
        where: {
            user_id: userId
        }
    })
    return cart.dataValues.id
}
const cartById = async (req, res) => {
    const { id } = req.dataToken;
    const carts_id = await getCartIdByUserId(id);

    try {
        let cart = await db.carts.findByPk(carts_id);
        let items = db.carts_has_products.findAll({
            where: {
                carts_id
            }
        });
        console.table(items);
        cart.cart = items;
        res.status(200).json(cart);
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
        let currentTime = new Date();
        cart.forEach(c => {
            db.carts_has_products.create({
                products_id: c.product,
                carts_id: id,
                quantity: c.quantity,
                add_date: currentTime
            })
        });
        res.status(200).json({
            msg: 'Cart updated'
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const addToCart = (req, res) => {
    const { id } = req.dataToken;
    const { product, quantity } = req.body;
    const cartId = getCartIdByUserId(id);

    try {
        db.carts_has_products.create({
            product_id: product,
            carts_id: cartId,
            quantity: quantity
        }).then(r => {
            res.status(200).json({
                msg: 'Item added'
            });
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

module.exports = { cartById, editCart, createCart, removeCart };