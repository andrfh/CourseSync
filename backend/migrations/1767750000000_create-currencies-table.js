export async function up(pgm) {
  pgm.createTable('currencies', {
    id: { type: 'text', primaryKey: true },
    char_code: { type: 'text', notNull: true },
    name: { type: 'text', notNull: true },
    nominal: { type: 'integer', notNull: true },
    source: { type: 'text', notNull: true },
  });
}

export async function down(pgm) {
  pgm.dropTable('currencies');
}