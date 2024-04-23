const axios = require('axios');
const crypto = require('crypto');

const amount = 100;
const SECRET_KEY = 'a2384be7-a18b-4047-9a16-1f75fff3';
const SECRET_IV = Buffer.from('0123456789abcABC', 'utf-8');

const timestamp = Date.now();
const orderid = "secure" + timestamp;

const dataToEncrypt = JSON.stringify({
    amount: amount.toString(),
    orderid: orderid
});

function encrypt(data, secretKey, secretIV) {
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey, 'utf-8'), secretIV);
    let encrypted = cipher.update(data, 'utf-8', 'base64');
    encrypted += cipher.final('base64');
    return encrypted;
}

async function sendRequest() {
    try {
        const encryptedData = encrypt(dataToEncrypt, SECRET_KEY, SECRET_IV);

        const payload = JSON.stringify({
            reqData: encryptedData,
            agentCode: "GRjXgbLg6W"
        });
        const response = await axios.post('https://crapi.floxypay.io/v1/order/generate', payload, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.data && response.data.data) {
            const decryptedData = decrypt(response.data.data, SECRET_KEY, SECRET_IV);
            const data = JSON.parse(decryptedData);
            if (data && data.url) {
                console.log("Redirecting to:", data.url);
            } else {
                console.error("Unable to fetch URL from the JSON data.");
            }
        } else {
            console.error("Invalid API response or missing data.");
        }
    } catch (error) {
        console.error("Error:", error.message);
    }
}

sendRequest();

