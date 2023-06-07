import { Router } from 'express';
import { itemController } from './controllers/items'

const router: Router = Router();

router.post('/items', itemController.addItem);
router.get('/items', itemController.getAllItems);

export { router };