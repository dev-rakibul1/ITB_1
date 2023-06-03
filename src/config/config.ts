import dotenv from 'dotenv'
import path from 'path'
dotenv.config({ path: path.join(process.cwd(), '.env') })

export default {
  port: process.env.PORT || 1000,
  database_urls: process.env.DATABASE_URL,
  student_password: process.env.DEFAULT_STUDENT_PASS,
}
