const express = require('express');
const Router = express.Router();
const Passport = require('passport');
Router.use(express.json());
const {BD_Productos} = require('../DB/DAOs/Productos.Faker');
const { BD_Autores } = require('../DB/DAOs/Autores.daos')

function checkAutentication(req, res, next){
    if(req.isAuthenticated()){
        res.redirect('/fail_login');
    }else{
        next();
    }
}

async function createCookie(id){
    const data_user = await BD_Autores.getById(id);
    delete data_user._id;
    delete data_user.__v;
    delete data_user.password;
    console.log(data_user);
    return data_user;
}

Router.get('/', async(req, res) =>{
    if(req.isAuthenticated() && req.cookies.data_user === undefined){
        res.cookie('data_user', await createCookie(req.session.passport.user), {maxAge:60*10000, httpOnly: false})
    }
    let productos = BD_Productos.getAll();
    res.render('main',{layout : 'index', 'productos': productos});
});

Router.get('/fail_login', (req, res) =>{
    const err = "No se pudo Iniciar Sesión"
    res.render('main',{layout: 'refused_login', err: err});
});

Router.get('/fail_register', (req, res) =>{
    const err = "No se pudo crear la cuenta"
    res.render('main',{layout: 'refused_login', err: err});
});

Router.post('/register', Passport.authenticate('signup',{
    successRedirect: 'api/login',
    failureRedirect: 'fail_register'
}));

Router.post('/login', checkAutentication, Passport.authenticate('login',{
    successRedirect: '/',
    failureRedirect: '/fail_login'
}));

Router.get('/logout', (req, res) =>{
    req.logOut(function(err){
        if(err)return next(err);
    });
    res.redirect('/');
});

Router.get('/test', (req, res) =>{
    res.render('main', {layout:'test'});
});
module.exports = { Router };
