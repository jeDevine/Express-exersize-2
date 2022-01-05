import express from 'express';
import shop from '../models/shops';
const shopRoutes = express.Router();

let arrayOfShops:shop[] = [
    {id: 111, name: "Donuts", rating:5.0},
    {id: 222, name: "Clothes", rating:1.5},
    {id: 333, name: "Bike Shop", rating:3.0},
    {id: 444, name: "Grocery", rating:3.5},
    {id: 555, name: "GameStop", rating:4.2},
];

shopRoutes.get(`/api/shops`, (req, res) => {
    if(req.query.minRating){
        let rated:shop[] = [];
        let potato:number = Number.parseFloat(req.query.minRating as string);
        for (let i = 0; i < arrayOfShops.length; i++) {
            if(arrayOfShops[i].rating > potato){
                rated.push(arrayOfShops[i]);
            }
        }
        res.json(rated);
    } else{
        res.json(arrayOfShops);
    }
})

shopRoutes.get("/api/shops/:id", (req, res) => {
    let inputID:number = Number.parseInt(req.params.id);
    for (let i = 0; i < arrayOfShops.length; i++) {
        if (arrayOfShops[i].id === inputID){
            res.json(arrayOfShops[i]);
        } else {
            res.status(404)
            res.send(`error: Shop not found ${inputID}`)
        }
    }
})

shopRoutes.get("/", (req, res) => {
    res.render(`home`)
})

shopRoutes.get("/shop-list", (req, res) => {
    let shops = arrayOfShops;
    if (req.query.minRating){ //if minRaiting exsists
        let rated:shop[] = [];
        let potato:number = Number.parseFloat(req.query.minRating as string);
        shops = arrayOfShops.filter(shop => shop.rating >= potato) //edit shops to be new filtered array
        res.render("allShops", {shops})
    } else {
        res.render("allShops", {shops}) //if minRaiting doesnt exsist dont change the array and just send back
    }
})

shopRoutes.get("/shop-details/:id", (req, res) => {
    let inputID:number = Number.parseInt(req.params.id);
    for (let i = 0; i < arrayOfShops.length; i++) {
        if (arrayOfShops[i].id === inputID){
            let potato = arrayOfShops[i];
            res.render("shop", {potato});
        } else {
            res.status(404)
            // res.send(`error: Shop not found ${inputID}`)
        }
    }
})

shopRoutes.get("/shop-search-form", (req, res) => {
    res.render("shopSearchForm")
})

export default shopRoutes;