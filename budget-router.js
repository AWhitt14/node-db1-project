const express = require('express');
const db = require('./data/dbConfig');

const router = express.Router();


router.get('/', async (req,res,next) => {
    try{
       const accounts = await db.select('*').from('accounts');
       res.status(200).json(accounts)

    } catch (er) {
        next(er)
    }
} )

router.get("/:id", async (req, res, next) => {
    try {
        const [account] = await db.select("*")
        .from("accounts")
        .where('id', req.params.id)
        res.json(account)
    } catch (err) {
        next(err)
    }
})

router.post("/", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        if (!payload.name || !payload.budget){
            return res.status(400).json({Messgae: 'incorrect body'})
        }

        const [id] = await db.insert(payload).into("accounts")

        res.status(201).json(await getAccountByID(id))
    } catch (er) {
        next(er)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const payload = {
            name: req.body.name,
            budget: req.body.budget
        }
        if (!payload.name || !payload.budget){
            return res.status(400).json({Messgae: 'incorrect body'})
        }

        await db("accounts").where("id", req.params.id).update(payload)
        
        res.json(await getAccountByID(req.params.id))

    } catch (er) {
        next(er)
    }
})

router.delete("/:id", async (req, res, next) => {
    try {
		await db("accounts").where("id", req.params.id).del()
		res.status(204).end()
	} catch (err) {
		next(err)
	}
})

function getAccountByID(id) {
	return db
		.first("*") 
		.from("accounts")
		.where("id", id)
}


module.exports = router