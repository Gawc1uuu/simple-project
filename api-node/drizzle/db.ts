import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import fs from 'fs';

let databaseUrl = process.env.DATABASE_URL || fs.readFileSync(process.env.DATABASE_URL_FILE!, 'utf8').trim()

export const pool = new Pool({
    connectionString: databaseUrl,
  });

export const db = drizzle({ client: pool });
