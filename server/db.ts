import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from '@shared/schema';

// Create a connection to the database using the environment variables
const client = postgres(process.env.DATABASE_URL!);
export const db = drizzle(client, { schema });

// Log that the database is connected
console.log('Database connected');