import Router from 'express'
import currencyController from './Controllers/currency.controller.js';
import ratesController from './Controllers/rates.controller.js';

const router = new Router()

router.get("/currency", currencyController.getAllCurrencies);
router.get("/currency/:id", currencyController.getOneCurrency);
router.post("/currency", currencyController.createCurrency);
router.put("/currency/:id", currencyController.updateCurrency)
router.delete("/currency/:id", currencyController.deleteCurrency);

router.get("/rates", ratesController.getAllRates);
router.get("/rates/:id", ratesController.getOneRate);
router.post("/rates", ratesController.createRate);
router.put("/rates/:id", ratesController.updateRate)
router.delete("/rates/:id", ratesController.deleteRate);

export default router; 