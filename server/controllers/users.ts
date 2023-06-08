import { Request, Response } from 'express';
import { userModel } from '../models/users';


const getPacks = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id)
    const response = await userModel.getPacks(userId);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

const getItems = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.id)
    const response = await userModel.getItems(userId);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

export const userController = { getPacks, getItems }