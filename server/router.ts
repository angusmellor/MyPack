import { Router } from 'express';
import { itemController } from './controllers/items'
import { catController } from './controllers/categories';
import { packController } from './controllers/packs';

const router: Router = Router();

router.post('/items', itemController.addItem);
router.post('/packs', packController.addPack);

router.get('/items', itemController.getAll);
router.get('/packs', packController.getAll);
router.get('/:id/packs', packController.getUserPacks)
router.get('/:id/items', itemController.getUserItems)
// router.get('/packs', packController.getAll);
// router.get('/names', nameController.getAll);
router.get('/categories', catController.getAll);

export { router };