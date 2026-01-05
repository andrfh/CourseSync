import Router from 'express'

const router = new Router()

router.get("/getAllCurrencies", (req, res) => {return res.status(200).json({ message: "Все валюты" });})

export default router; 