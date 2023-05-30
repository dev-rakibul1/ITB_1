import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from '../index'
dotenv.config()

import config from '../config/config'

const databaseConnect = async () => {
  try {
    await mongoose.connect(config.database_url as string)
    console.log(colors.black.underline.bgGreen('Database is connected!'))

    app.listen(config.port, () => {
      console.log(
        colors.bgMagenta.brightYellow(
          `Example app listening on port ${config.port}`
        )
      )
    })
  } catch (error) {
    console.log(colors.white.bgRed('Fail to DB connected!', error.message))
  }
}

export default databaseConnect
