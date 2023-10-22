import express, { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import env from 'dotenv';
import mongoose from 'mongoose';
import userAuthRouter from './src/modules/auth/user-auth-route';
import adminAuthRoute from './src/modules/auth/admin-auth-route';
import categoryRoute from './src/modules/category/category-route';
import productRoutes from './src/modules/product/product-route';
import cartRoutes from './src/modules/cart/cart-routes';
import cors from 'cors'

const app = express();

//environment variable/constant
env.config();

//Database connection
mongoose.connect(
  `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0.1gkcp.mongodb.net/flipkart-clone?retryWrites=true&w=majority`
).then(() => {
  console.log("Connected to database")
})
  .catch((err: any) => {
    console.log(err);
  });

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
app.use(cors())

//Routes
app.use("/api", userAuthRouter);
app.use("/api", adminAuthRoute);
app.use("/api", categoryRoute);
app.use('/api', productRoutes);
app.use('/api', cartRoutes);

//error handler at the app level
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  res.status(500);
  res.json({
    message: err.message,
    error: err
  });
})
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`)
})