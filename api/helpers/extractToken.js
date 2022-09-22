const express = require('express');

function extractToken (req,res) {

    try {
        const tokenAuth = req.headers.authorization.split(' ');
        if(tokenAuth && tokenAuth[0] === 'Bearer'){
            return tokenAuth[1];
        }else{
            return null;
        }
    } catch (error) {
        res.status(400).json({
            msg: 'Falta token'
        })
    }


}

module.exports = extractToken;