import { Router, Request, Response } from 'express';
import db from './database/connection';

const routes = new Router();

routes.get( '/', ( req: Request, res: Response ) => {
    return res.json({ msg: 'Primeira rota.' });
});

routes.get( '/2', ( req: Request, res: Response ) => {
    return res.json({ msg: 'Segunda rota.' });
});


// Aulas

// interface Data {
//     name: string,
//     avatar: string,
//     whatsapp: string,
//     bio: string,
//     subject: string,
//     cost: number,
//     schedule: object[]
// }

routes.post( '/classes', async ( req: Request, res: Response ) => {
    // const { data } = ;

    const { name,
        avatar,
        whatsapp,
        bio,
        subject,
        cost,
        schedule
    } = req.body;

    await db( 'users' ).insert({
        name,
        avatar,
        whatsapp,
        bio
    });

    return res.send();
});

export default routes;
