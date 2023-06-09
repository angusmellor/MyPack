import { Router } from 'express';
import { itemController } from './controllers/items'
import { catController } from './controllers/categories';
import { packController } from './controllers/packs';
import { userController } from './controllers/users';

const router: Router = Router();

router.post('/items', itemController.addItem);
router.post('/packs', packController.addPack);

router.get('/items', itemController.getAll);
router.get('/packs', packController.getAll);
router.get('/categories', catController.getAll);

router.get('/users/:id/packs', userController.getPacks);
router.get('/users/:id/items', userController.getItems);
router.get('/packs/:id/items', packController.getPackItems);
router.get('/packs/:id', packController.getPack);

router.put('/items/:itemId/users/:userId', itemController.connectToUser);
router.put('/items/:itemId/packs/:packId', itemController.connectToPack);

export { router };