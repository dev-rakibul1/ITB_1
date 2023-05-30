import cors from 'cors'
import express, { Application, Request, Response } from 'express'
import userService from './app/modules/user/user.service'
import databaseConnect from './utilities/server'
const app: Application = express()

// middle were calling
app.use(express.json())
app.use(cors())
app.use(express.urlencoded({ extended: true }))

app.get('/', async (req: Request, res: Response) => {
  const fakeData = await userService.createUser({
    id: '00001',
    role: 'student',
    password: '56sdf4s4d6f4',
  })
  console.log(fakeData)
  res.send('Hello World!')
})

// global error handling
app.get('*', (req: Request, res: Response) => {
  res.status(404).json({
    status: 404,
    message: 'Your route not found',
  })
})

// database calling
databaseConnect()

export default app
