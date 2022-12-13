import dayjs from "dayjs";
import { connectionDB } from "../database/db.js";

export async function create(req, res) {
    const { name, phone, cpf, birthday } = req.body;

    const validateBirthday = dayjs(birthday).isValid();

    if (validateBirthday) {
        try {
            await connectionDB.query('INSERT INTO customers (name, phone, cpf, birthday) VALUES ($1, $2, $3, $4);', [name, phone, cpf, birthday]);
            res.sendStatus(201);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        res.sendStatus(400);
    }

}

export async function findAll(req, res) {

    try {
        const all = await connectionDB.query('SELECT * FROM customers;');
        res.send(all.rows);
    } catch (err) {
        res.status(500).send(err.message);
    }
}

export async function findById(req, res) {
    const { id } = req.params;

    try {
        const findId = await connectionDB.query(`SELECT * FROM customers WHERE id=$1`, [id]);
        res.send(findId.rows[0]);
    } catch (err) {
        res.status(500).send(err.message);
    }

}

export async function updateCustomer(req, res) {
    const { id } = req.params;
    const { name, phone, cpf, birthday } = req.body;

    const validateBirthday = dayjs(birthday).isValid();

    if (validateBirthday) {
        try {
            await connectionDB.query('UPDATE customers SET name=$1, phone=$2, cpf=$3, birthday=$4 WHERE id=$5;', [name, phone, cpf, birthday, id]);
            res.sendStatus(200);
        } catch (err) {
            res.status(500).send(err);
        }
    }
    else {
        res.sendStatus(400);
    }
}