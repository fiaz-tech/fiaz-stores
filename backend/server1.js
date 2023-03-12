import  path  from 'path'
import express from 'express'
import dotenv from 'dotenv'
import connectDB from './config/db.js'
import colors from 'colors'
const app = express();

import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'


import { notFound, errorHandler } from './middleware/errorMiddleware.js'
dotenv.config();

connectDB()

app.use(express.json())

app.use('/api/products', productRoutes)
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/upload', uploadRoutes)

app.get('/api/config/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()
app.use('/uploads', express.static(path.join(__dirname, '/uploads')))

app.use(notFound)
app.use(errorHandler)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 33033
app.listen(33033, console.log(
  `Server running in ${process.env.NODE_ENV} mode from PORT ${PORT}`.red.bold
  ))