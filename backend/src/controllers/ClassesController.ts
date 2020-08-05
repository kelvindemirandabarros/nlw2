import { Request, Response } from 'express';
import db from '../database/connection';
import convertHourToMinutes from '../utils/conversHourToMinutes';

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

interface ScheduleItem {
    class_id: number,
    week_day: number,
    from: string,
    to: string
}

export default class ClassesController {
    async index ( req: Request, res: Response ) {
        const filters = req.query;

        const week_day = filters.week_day as string;
        const subject = filters.subject as string;
        const time = filters.time as string;

        if ( !week_day || !subject || !time ) {
            return res.status( 400 ).json({
                msg: 'Falta informações na requisição.'
            });
        }

        const timeInMinutes = convertHourToMinutes( time );

        const classes = await db ( 'classes' )
            .whereExists( function () {
                this.select( 'class_schedules.*' )
                    .from( 'class_schedules' )
                    .whereRaw( '`class_schedules`.`class_id` = `classes`.`id`' )
                    .whereRaw( '`class_schedules`.`week_day` = ??', [ Number( week_day ) ] )
                    .whereRaw( '`class_schedules`.`from` <= ??', [ timeInMinutes ] )
                    .whereRaw( '`class_schedules`.`to` > ??', [ timeInMinutes ] )
            })
            .where( 'classes.subject', '=', subject )
            .join( 'users', 'classes.user_id', '=', 'users.id' )
            .select( [ 'classes.*', 'users.*' ] )

        return res.json( classes );
    }


    async create ( req: Request, res: Response ) {
        // const { data } = req.body;
    
        const { name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule
        } = req.body;
    
        const trx = await db.transaction(); // Se alguma das informações falhar em ser adicionada no DB, todas as outras que são relacionadas serão excluídas.
    
        try {
            const insertedUsersIds = await trx( 'users' ).insert({
                name,
                avatar,
                whatsapp,
                bio
            });
        
            const user_id = insertedUsersIds[0];
        
            const insertedClassesIds = await trx( 'classes' ).insert({
                subject,
                cost,
                user_id
            });
        
            const class_id = insertedClassesIds[0];
        
            const classSchedule = schedule.map( ( scheduleItem: ScheduleItem ) => {
                return {
                    class_id,
                    week_day: scheduleItem.week_day,
                    from: convertHourToMinutes( scheduleItem.from ),
                    to: convertHourToMinutes( scheduleItem.to )
                };
            });
        
            await trx( 'class_schedules' ).insert( classSchedule );
        
            await trx.commit(); // Envia as informações para o DB.
        
            return res.status( 201 ).send();
        } catch ( error ) {
            await trx.rollback(); // Desfaz tudo na ‘transaction’ (trx).
    
            return res.status( 400 ).json({ 
                error,
                msg: 'Houve um erro inesperado ao criar uma aula.'
            });
        }
    }
}