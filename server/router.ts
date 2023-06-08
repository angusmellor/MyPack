import { Router } from 'express';
import { itemController } from './controllers/items'

const router: Router = Router();

router.post('/items', itemController.addItem);

router.get('/items', itemController.getAll);
router.get('/packs', packController.getAll);
router.get('/names', nameController.getAll);
router.get('/categories', catController.getAll);

export { router };