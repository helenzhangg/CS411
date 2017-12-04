/*
 Configuration information for Twitter API authorization. DO NOT push this to github
 Note: rename this file to twitter.js to match the require AND move to /config folder
 */

const Twitter = {
    CONSUMER_KEY: 'UkTSFItHaEPuhRjLPKLh2wqg6',
    CONSUMER_SECRET: 'IC9070kiBkvl3tPZHYC9A4eDpQ68zuj9Vzd6ZipzX7yBACKaLn',
    OWNER_ID: '3134023545',
    CALLBACK_URL: 'http://localhost:3000/auth/callback',
    REQ_TOKEN_URL: 'https://api.twitter.com/oauth/request_token',
    AUTHORIZE_URL: 'https://api.twitter.com/oauth/authorize',
    ACCESS_TOKEN_URL: 'https://api.twitter.com/oauth/access_token'
}

module.exports = Twitter