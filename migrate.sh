npx prisma migrate dev
npx prisma migrate diff --from-empty --to-schema-datamodel prisma/schema.prisma --script > prisma/all_migrations.sql
turso db shell life-track < prisma/all_migrations.sql
