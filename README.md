# ERS Assets server

This server is used to cache images and documents locally for faster serving

# Install and start

git clone https://github.com/EuropeanRespiratorySociety/ers-assets.git
npm install
npm start

You need .env file

- SQS_ACCESS_KEY
- SQS_SECRET_KEY

You need gitana.json file from Cloud CMS API Key

{
"clientKey": "???",
"clientSecret": "???",
"username": "?",
"password": "?",
"baseURL": "https://api.cloudcms.com",
"application": "?"
}
