import Knex from 'knex';

export async function up( knex: Knex ) {
    return knex.schema.createTable( 'class_schedules', table => {
        table.increments( 'id' ).primary();
        table.integer( 'week_day' ).notNullable();
        table.integer( 'from' ).notNullable();
        table.integer( 'to' ).notNullable();
        
        table.integer( 'class_id' )
            .notNullable()
            .references( 'id' )
            .inTable( 'classes' )
            .onUpdate( 'CASCADE' ) // Se o ID do professor sofrer alguma alteração, todas as aulas dele serão excluídas.
            .onDelete( 'CASCADE' ); // Se o professor for excluído da plataforma, todas as aulas dele também serão excluídas.
    });
}

export async function down( knex: Knex ) {
    return knex.schema.dropTable( 'class_schedules' );
}
