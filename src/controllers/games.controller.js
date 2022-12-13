import { connectionDB } from "../database/db.js";

export async function create(req, res){
    const { name, image, stockTotal, categoryId, pricePerDay } = req.body;

    try{
        await connectionDB.query('INSERT INTO games (name, image, "stockTotal", "categoryId", "pricePerDay") VALUES ($1, $2, $3, $4, $5);',[name, image, stockTotal, categoryId, pricePerDay]);
        res.sendStatus(201);
    }catch(err){
        res.status(500).send(err.message);
    }
}

export async function findAll(req, res){
    try{
        const all = await connectionDB.query('SELECT games.*, categories.name AS "categoryName" FROM games JOIN categories ON games."categoryId" = categories.id');
        res.send(all.rows);
    }catch(err){
        res.status(500).send(err.message);
    }
}