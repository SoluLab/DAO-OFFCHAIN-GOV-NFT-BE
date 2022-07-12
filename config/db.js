const mongoose = require('mongoose')
const DB_URL = process.env.MONGO_URI

module.exports = () => {
  const connect = () => {
    mongoose.Promise = global.Promise

    mongoose.connect(DB_URL, (err) => {
      let dbStatus = ''
      if (err) {
        dbStatus = `*    Error connecting to DB: ${err}\n****************************\n`
      }
      dbStatus = `*    DB Connection: OK\n****************************\n`
      if (process.env.NODE_ENV !== 'test') {
        // Prints initialization
        console.log('****************************')
        console.log('*    Starting Server')
        console.log(`*    Port: ${process.env.PORT || 3000}`)
        console.log(`*    Database: MongoDB`)
        console.log(dbStatus)
      }
    })
  }
  connect()

  mongoose.connection.on('error', console.log)
  mongoose.connection.on('disconnected', connect)

}