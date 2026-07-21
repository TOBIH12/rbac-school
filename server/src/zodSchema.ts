import { z } from 'zod';

export const createUserSchema = z.object({
    firstName: z.string().min(1, { message: 'First name is required' }),
    lastName: z.string().min(1, { message: 'Last name is required' }),
    email: z.string().email({ message: 'Invalid email address' }),
    roleId: z.string().min(1, { message: 'Role ID is required' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

export const createUserSchemaDTO = z.object({
    body: createUserSchema
});

export const loginUserSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long' })
});

export const loginUserSchemaDTO = z.object({
    body: loginUserSchema
});