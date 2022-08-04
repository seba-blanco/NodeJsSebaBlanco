require('dotenv').config()

module.exports = {
  MONGO_URI: process.env.MONGO_URI || '',
  FIRESTORE_FILE: process.env.FIRESTORE_FILE || '',
  DEFAULTSTORE:process.env.DEFAULTSTORE,
  EXPIRATION_TIME: process.env.EXPIRATION_TIME || 30000,
  MAILADMIN:process.env.MAILADMIN,
  MAILFROM:process.env.MAILFROM,
  WHATSFROM:process.env.WHATSFROM,
  TWILIOACCOUNT_SID:process.env.TWILIOACCOUNT_SID,
  TWILIOAUTH_TOKEN:process.env.TWILIOAUTH_TOKEN
}
