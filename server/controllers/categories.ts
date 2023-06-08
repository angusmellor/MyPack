import { catModel } from '../models/categories';
import { Request, Response } from 'express';

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await catModel.getAll();
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

export const catController = { getAll};