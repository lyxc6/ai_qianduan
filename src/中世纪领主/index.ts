import { Schema } from './schema';

export type Variables = z.infer<typeof Schema>;
