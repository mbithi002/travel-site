import moment from "moment"
import InitTransaction from "../models/initTransaction-model.js"

export const initMpesa = async (req, res) => {
    const accessToken = req.accessToken
    const { phoneNumber, amount, user, booking } = req.body
    try {
        if (!phoneNumber || !amount || !user || !booking) {
            return res.status(400).json({ message: 'Please provide all required fields' })
        }
        if (!accessToken) {
            res.status(401).json({
                error: 'no access token provided'
            })
        }
        const shortcode = '600977'
        const timestamp = moment().format("YYMMDDHHmmss");
        const password = Buffer.from(`${shortcode}${process.env.MPESA_PASS_KEY}${timestamp}`).toString("base64")
        const CallBackUrl = process.env.NODE_ENV === 'production' ? `https://travel-site-ueg1.onrender.com/api/mpesa/complete` : `${process.env.NGROK_BASE_URL}/api/mpesa/complete`
        const stkPushResponse = await axios.post(
            "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
            {
                BusinessShortCode: shortcode,
                Password: password,
                Timestamp: timestamp,
                TransactionType: "CustomerPayBillOnline",
                Amount: '1',
                PartyA: phoneNumber,
                PartyB: shortcode,
                PhoneNumber: phoneNumber,
                CallBackURL: CallBackUrl,
                AccountReference: 'Travel Agency',
                TransactionDesc: 'Booking payment',
            },
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                },
            }
        );

        const mpesaResponse = stkPushResponse.data
        const { MerchantRequestID, CheckoutRequestID, ResponseCode } = mpesaResponse

        const newInitTransaction = new InitTransaction({
            MerchantRequestID,
            CheckoutRequestID,
            ResponseCode,
            user,
            amount,
            phoneNumber,
            booking
        })
        await newInitTransaction.save()
        res.status(200).json({ message: 'Transaction initiated successfully' })
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        console.log("Error at getReviewsForDestination :", error);
    }
}

export const callbackMpesa = async (req, res) => {
    try {
        console.log('incoming req body', req.body)
        // TODO write logic for call back
    } catch (error) {
        res.status(500).json({
            error: "Internal server error",
        });
        console.log("Error at getReviewsForDestination :", error);
    }
}