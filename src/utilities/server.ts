import colors from 'colors'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import app from '../index'
dotenv.config()

import config from '../config/config'
import { errorLogger, logger } from '../shared/logger'

const databaseConnect = async () => {
  try {
    await mongoose.connect(config.database_urls as string)
    logger.info(colors.black.underline.bgGreen('Database is connected!'))

    app.listen(config.port, () => {
      logger.info(
        colors.bgMagenta.brightYellow(
          `Example app listening on port ${config.port}`
        )
      )
    })
  } catch (error) {
    errorLogger.error(
      colors.white.bgRed('Fail to DB connected!', error.message)
    )
  }
}

export default databaseConnect
