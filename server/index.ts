import express, { Express } from 'express';
import { router } from './router';
import cors from 'cors'
import dotenv from 'dotenv';

dotenv.config();

const app: Express = express();
const port = process.env.PORT;

app
  .use(cors())
  .use(express.json())
  .use(router)

app.listen(3001, () => {
  console.log(`Server running at http://localhost:3001`)
})