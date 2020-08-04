import Knex from 'knex';

export async function up( knex: Knex ) {
    return knex.schema.createTable( 'classes', table => {
        table.increments( 'id' ).primary();
        table.string( 'subject' ).notNullable();
        table.decimal( 'cost' ).notNullable();
        
        table.integer( 'user_id' )
            .notNullable()
            .references( 'id' )
            .inTable( 'users' )
            .onUpdate( 'CASCADE' ) // Se o ID do professor sofrer alguma alteração, todas as aulas dele serão excluídas.
            .onDelete( 'CASCADE' ); // Se o professor for excluído da plataforma, todas as aulas dele também serão excluídas.
    });
}

export async function down( knex: Knex ) {
    return knex.schema.dropTable( 'classes' );
}
