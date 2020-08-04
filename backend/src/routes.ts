import { Router } from 'express';

const routes = new Router();

routes.get( '/', ( req, res ) => {
    return res.json({ msg: 'Primeira rota.' });
});

routes.get( '/2', ( req, res ) => {
    return res.json({ msg: 'Segunda rota.' });
});

export default routes;
