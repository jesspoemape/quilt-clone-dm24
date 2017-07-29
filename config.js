module.exports = {
    "connectionString": "postgres://drwdmhrdwpwkvq:e0e877b477553a7d199b57cefd375252fa78697862ad6df4970351a2cbb8741a@ec2-23-21-96-159.compute-1.amazonaws.com:5432/d47tg9visn1fbf?ssl=true",
    "sessionSecret": "7384uhejrfsd7yu230jkfnndfjkvbkwle0238ubfjbq8rgqyhbefjdksbfuiewfbj",
    "auth0": {
        "domain" : "jesspoemape.auth0.com",
        "clientID": "Uk3iqCJdAfg4LGLX3USC71vSzvsXCu8Y",
        "clientSecret": "NYbxysplhX_3xc6N9oHAOCalnoND4juixMZ7hlVzWG613xEJUXWvn26VeuauTyRv",
        "callbackUrl": (process.env.AUTH0_CALLBACK_URL) ? process.env.AUTH0_CALLBACK_URL : "http://localhost:3001/auth/callback"
    }
}