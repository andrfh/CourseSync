export async function up(pgm) {
  pgm.createTable('rates', {
    id: { type: 'serial', primaryKey: true },
    currency_id: {
      type: 'text',
      notNull: true,
      references: 'currencies(id)',
      onDelete: 'cascade',
    },
    rate: { type: 'numeric(12,6)', notNull: true },
    date: { type: 'date', notNull: true },
    created_at: { type: 'timestamp', default: pgm.func('now()') },
  });

  pgm.addConstraint(
    'rates',
    'rates_currency_date_unique',
    { unique: ['currency_id'] }
  );
}

export async function down(pgm) {
  pgm.dropTable('rates');
}