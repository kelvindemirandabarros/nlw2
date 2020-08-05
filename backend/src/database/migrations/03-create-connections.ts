import Knex from 'knex';

export async function up( knex: Knex ) {
    return knex.schema.createTable( 'connections', table => {
        table.increments( 'id' ).primary();
        
        table.integer( 'user_id' )
            .notNullable()
            .references( 'id' )
            .inTable( 'users' )
            .onUpdate( 'CASCADE' ) // Se o ID do professor sofrer alguma alteração, todas as aulas dele serão excluídas.
            .onDelete( 'CASCADE' ); // Se o professor for excluído da plataforma, todas as aulas dele também serão excluídas.

        table.timestamp( 'created_at' )
            .defaultTo( knex.raw( 'CURRENT_TIMESTAMP' ) )
            .notNullable();
    });
}

export async function down( knex: Knex ) {
    return knex.schema.dropTable( 'connections' );
}
