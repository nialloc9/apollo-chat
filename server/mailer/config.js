const {
    SEND_EMAIL_HOST,
    SEND_EMAIL_PORT,
    SEND_EMAIL_SECURE,
    SEND_EMAIL_ADDRESS,
    SEND_EMAIL_PASSWORD
} = process.env;

//EMAIL CONFIG
const config = {
    host: SEND_EMAIL_HOST,
    port: SEND_EMAIL_PORT,
    secure: SEND_EMAIL_SECURE, // secure:true for port 465, secure:false for port 587
    auth: {
        user: SEND_EMAIL_ADDRESS,
        pass: SEND_EMAIL_PASSWORD
    }
};

export default config;