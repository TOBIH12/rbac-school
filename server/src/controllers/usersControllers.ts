import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import z from 'zod';
import pool from '../config/db';
import { fetchUserByEmailQuery, inputUserRoleValuesQuery, insertUserQuery } from '../queries/user.queries';
import { createUserSchema, loginUserSchema } from '../zodSchema';

dotenv.config();

type CreateUserInput = z.infer<typeof createUserSchema>;
type LoginUserInput = z.infer<typeof loginUserSchema>

export default class UsersController {
    async createUser(req: Request<{}, {}, CreateUserInput>, res: Response): Promise<Response> {
    try {
      const { firstName, lastName, email, roleId, password } = req.body;

      const newEmail = email.toLowerCase();
      const emailExists = await pool.query(fetchUserByEmailQuery, [newEmail])

       if (emailExists.rows && emailExists.rows.length > 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Email already exists',
        });
      }

      const newUserPassword = password

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(newUserPassword, salt);

      const insertUserValues = [
        firstName,
        lastName,
        newEmail,
        hashedPassword
      ]

      const newUserResult = await pool.query(insertUserQuery, insertUserValues);
      if (!newUserResult.rows || newUserResult.rows.length === 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Failed to create user',
        });
      }

      const user = newUserResult.rows[0];
      const {id, first_name, last_name} = user;

      const newUserRoleResult = await pool.query(inputUserRoleValuesQuery, [id, roleId])
      if(!newUserRoleResult.rows || newUserRoleResult.rows.length === 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Failed to assign role to user',
        });
      }

      return res.status(201).json({
        status: 'success',
        data: {
          message: 'User created successfully',
          userId: id,
          firstName: first_name,
          lastName: last_name,
          roleId: roleId
        }
      });

    } catch (error: unknown) {
      console.error('Error creating user:', error);
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async login(req: Request<LoginUserInput>, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      const newEmail = email.toLowerCase();

      const userResponse = await pool.query(fetchUserByEmailQuery, [newEmail])
      if(!userResponse.rows || userResponse.rows.length === 0){
           return res.status(400).json({
          status: 'error',
          error: 'Invalid Email or Password',
        });
      }

      const user = userResponse.rows[0];
      const userPassword = password

      const checkPassword = await bcrypt.compare(userPassword, user.password)
      if(!checkPassword){
         return res.status(400).json({
          status: 'error',
          error: 'Invalid email or password.',
        });
      }

      const userRows = userResponse.rows[0];

      const token = jwt.sign(
        {
          userId: userRows.user_id,
          firstName: userRows.first_name,
          lastName: userRows.last_name,
          email: userRows.email,
          roleId: userRows.role_id
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '15h'}
      )

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          userId: userRows.user_id,
          firstName: userRows.first_name,
          lastName: userRows.last_name,
          email: userRows.email,
          roleId: userRows.role_id
        },
      });
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async  adminViewUsers(req: Request<LoginUserInput>, res: Response): Promise<Response> {
    try {
      
      return res.send("get");
    } catch (error) {
      console.log(error)
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }
}