export const getMpesaToken = async (req, res, next) => {
    try {
        const authResponse = await axios.get(
            "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
            {
                auth: {
                    username: consumerKey,
                    password: consumerSecret,
                },
            }
        );
        const accessToken = authResponse.data.access_token;
        req.accessToken = accessToken
        next()
    } catch (error) {
        console.log('Error getting Mpesa token: ', error)
        throw new Error('Error getting Mpesa token')
    }
}