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
router.get('/:id/packs', userController.getPacks)
router.get('/:id/items', userController.getItems)

router.get('/categories', catController.getAll);

export { router };