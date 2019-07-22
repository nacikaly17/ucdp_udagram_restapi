import { Router, Request, Response } from 'express';
import { FeedRouter } from './feed/routes/feed.router';
import { UserRouter } from './users/routes/user.router';
import { FilteredImageRouter } from './filteredimage/routes/filteredimage.router';

const router: Router = Router();

router.use('/feed', FeedRouter);
router.use('/users', UserRouter);
router.use('/filteredimage', FilteredImageRouter);
router.get('/', async (req: Request, res: Response) => {
    res.send(`V0`);
});

export const IndexRouter: Router = router;