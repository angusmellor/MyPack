import { packModel } from '../models/packs';
import { Request, Response } from 'express';

const addPack = async (req: Request, res: Response) => {
  // const args = ['nameId', 'categoryId', 'description', 'weight']
  // const requiredArgs = args.reduce((acc, curr) => {
  //   return req.body.hasOwnProperty(curr) && acc ? acc : '';
  // }, '');
  // if (!requiredArgs){
  //   res.status(400);
  //   res.send();
  // }
  try {
    const response = await packModel.addPack(req.body);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await packModel.getAll();
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

export const packController = { addPack, getAll};