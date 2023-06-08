import { itemModel } from '../models/items';
import { Request, Response } from 'express';

const addItem = async (req: Request, res: Response) => {
  // const args = ['nameId', 'categoryId', 'description', 'weight']
  // const requiredArgs = args.reduce((acc, curr) => {
  //   return req.body.hasOwnProperty(curr) && acc ? acc : '';
  // }, '');
  // if (!requiredArgs){
  //   res.status(400);
  //   res.send();
  // }
  try {
    const response = await itemModel.addItem(req.body.id, req.body.item);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const response = await itemModel.getAll();
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

const connectToPack =async (req: Request, res: Response) => {
  try {
    const response = await itemModel.connectToPack(req.body.itemId, req.body.packId);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}

const connectToUser = async (req: Request, res: Response) => {
  try {
    const response = await itemModel.connectToUser(req.body.itemId, req.body.userId);
    res.status(201);
    res.send(response);
  } catch (err) {
    console.log(err);
    res.status(500);
  }
}
export const itemController = { addItem, getAll, connectToPack, connectToUser };