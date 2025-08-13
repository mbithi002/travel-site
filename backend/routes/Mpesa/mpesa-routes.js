import express from 'express'
import { callbackMpesa, initMpesa } from '../../controllers/mpesa-controller.js'
import { getMpesaToken } from '../../middleware/getMpesaToken.js'

const router = express.Router()

router.post('/init', getMpesaToken, initMpesa)
router.post('/complete', getMpesaToken, callbackMpesa)

export default router