const fs = require('fs');
const path = require('path');

let responseSent = false;

const cartById = (req, res) => {
    const { id } = req.dataToken;

    try {
        const dataToParse = fs.readFileSync(path.resolve(__dirname, '../data/carts.json'), 'utf-8');
        const cart = JSON.parse(dataToParse);

        if (!cart || id == 0) {
            return res.status(404).json({
                msg: "El carrito no existe"
            })
        }

        if (id != cart.user) {
            return res.status(403).json({
                msg: 'Solo puede acceder a su propio carrito'
            })
        }

        res.status(200).json(cart)
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const editCart = (req, res) => {
    const { id } = req.dataToken;

    try {
        const dataToParse = fs.readFileSync(path.resolve(__dirname, '../data/carts.json'), 'utf-8');
        const data = JSON.parse(dataToParse);

        let cart = data;

        if (!cart || id == 0) {
            return res.status(404).json({
                msg: "El carrito no existe"
            })
        }

        cart = {
            user: id,
            cart: req.body.cart
        };

        if (validCart(cart, res)) {
            fs.writeFileSync(path.resolve(__dirname, '../data/carts.json'), JSON.stringify(cart))
            return res.status(200).json(cart)
        }

        if (!responseSent)
            res.status(400).json({
                msg: 'Formato de carts incorrecto'
            })


    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Server error'
        })
    }
}

const validCart = (cart, res) => {
    cartArray = cart.cart;
    let products = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../data/products.json'), 'utf-8'));
    if (!cartArray || cartArray.length < 1) return false;

    let existe = true;
    cartArray.forEach(e => {
        if (!e.product || !productExists(e.product, products, res) || !e.quantity || e.quantity < 1) {
            existe = false;
            return;
        }
    })
    return existe;
}

const productExists = (p, products, res) => {
    let _prod = products.find(pr => pr.id == p);
    if (!_prod) {
        responseSent = true;
        console.log('Producto ' + p + ' no existe.');
        res.status(400).json({
            msg: `El producto ${p} no existe.`
        })
        return false;
    }
    return true;
}

const removeProductFromCart = productId => {
    const dataToParse = fs.readFileSync(path.resolve(__dirname, '../data/carts.json'), 'utf-8');
    const data = JSON.parse(dataToParse);

    let cart = data.cart.filter(item => item.product != productId);

    fs.writeFileSync(path.resolve(__dirname, '../data/carts.json'), JSON.stringify(cart))

}
module.exports = { cartById, editCart, removeProductFromCart };