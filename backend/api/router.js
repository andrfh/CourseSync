import Router from 'express'
import currencyController from './Controllers/currency.controller.js';

const router = new Router()

router.get("/getAllCurrencies", currencyController.getAllCurrencies)

export default router; 