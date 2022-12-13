import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";

export async function create(req, res) {
    const { customerId, gameId, daysRented } = req.body;

    const rentDate = dayjs().format("YYYY-MM-DD");

    const game = await connectionDB.query('SELECT * FROM games WHERE id=$1;', [gameId]);
    const rental = await connectionDB.query('SELECT * FROM rentals WHERE "gameId"=$1;', [gameId]);
    const customer = await connectionDB.query('SELECT * FROM customer WHERE id=$1;',[customerId]);
    const originalPrice = daysRented * game.rows[0].pricePerDay;

    const returnDate = null;

    const delayFee = null;

    try {
        if(game.rows[0].stockTotal <= rental.rowCount){
            return res.sendStatus(400);
        }
        if(!customer){
            return res.sendStatus(400);
        }
        if(!game){
            return res.sendStatus(400);
        }
        if(daysRented<=0){
            return res.sendStatus(400);
        }
        await connectionDB.query('INSERT INTO rentals ("customerId", "gameId", "daysRented", "rentDate", "originalPrice", "returnDate", "delayFee") VALUES ($1, $2, $3, $4, $5, $6, $7);', [customerId, gameId, daysRented, rentDate, originalPrice, returnDate, delayFee]);
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function findAll(req, res) {
    try {
        const all = await connectionDB.query('SELECT * FROM rentals');
        res.send(all.rows);
    } catch (err) {
        res.status(500).send(err);
    }
}

export async function finalize(req, res) {
    const { id } = req.params;

    try {
        const rental = await connectionDB.query('SELECT * FROM rentals WHERE id=$1;', [id]);
        if (!rental.rows[0]) {
            return res.sendStatus(404);
        }
        if (rental.rows[0].returnDate !== null) {
            return res.sendStatus(400);
        }
        const present = new Date();
        const past = new Date(rental.rows[0].rentDate);
        const diff = Math.abs(present.getTime() - past.getTime());
        const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
        const daysLate = days - rental.rows[0].daysRented;

        const game = await connectionDB.query('SELECT * FROM games WHERE id=$1;', [rental.rows[0].gameId]);
        let pricePerDay = daysLate * game.rows[0].pricePerDay;
        if (daysLate <= 0) {
            pricePerDay = null;
        }
        await connectionDB.query('UPDATE rentals SET "returnDate"=$1, "delayFee"=$2 WHERE id=$3;', [present, pricePerDay, id]);
        res.sendStatus(200);

    } catch (err) {
        res.status(500).send(err);
    }
}

export async function deleteRental(req, res){
    const {id} = req.params;

    try{
        const rental = await connectionDB.query('SELECT * FROM rental WHERE id=$1;', [id]);
        
        if(!rental.rows[0]){
            return res.sendStatus(404);
        }
        if(rental.rows[0].returnDate === null){
            return res.sendStatus(400);
        }
        await connectionDB.query('DELETE FROM rental WHERE id=$1;',[id]);
        res.sendStatus(200);
    }catch(err){
        res.status(500).send(err);
    }
    
}