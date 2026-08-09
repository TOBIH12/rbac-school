import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import z from 'zod';
import pool from '../config/db';
import { fetchUserByEmailQuery, inputUserRoleValuesQuery, insertUserQuery, getUsersCountQuery, getAllUsersQuery, fetchUserByIdQuery, fetchUserRoleByIdQuery, getLecturerStudentsCount, getLecturerStudentsQuery, deleteUserQuery, deleteUserRoleQuery } from '../queries/user.queries';
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
          error: 'Invalid email or password.',
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

      const token = jwt.sign(
        {
          userId: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roleId: user.role_id
        },
        process.env.JWT_SECRET as string,
        { expiresIn: '15h'}
      )

      return res.status(200).json({
        status: 'success',
        data: {
          token,
          userId: user.user_id,
          firstName: user.first_name,
          lastName: user.last_name,
          email: user.email,
          roleId: user.role_id
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async  adminViewUsers(req: Request, res: Response): Promise<Response> {
    try {
      const pageParam = req.params.page as string; 
      const page = Number.parseInt(pageParam, 10);
      const limit = 10;

      if (!Number.isFinite(page) || page <= 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid page number',
        });
      }

      const offset = (page - 1) * limit;

      const [usersCountResult, usersResult] = await Promise.all([
        pool.query(getUsersCountQuery),
        pool.query(getAllUsersQuery, [limit, offset])
      ])

      const totalUsers = usersCountResult.rows[0].total_users

      return res.status(200).json({
        status: 'success',
        data: {
          users: usersResult.rows || [],
          totalUsers,
          currentPage: page,
          totalPages: Math.ceil(totalUsers / limit)
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async adminViewSpecificUser(req: Request, res: Response): Promise<Response> {
    try {

        const userId = req.params.userId as string; 
        const parsedUserId = Number.parseInt(userId, 10);

      if (!Number.isFinite(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid userId',
        });
      }

      const [userResponse, roleResponse] = await Promise.all([
        pool.query(fetchUserByIdQuery, [parsedUserId]),
        pool.query(fetchUserRoleByIdQuery, [parsedUserId])
      ]);

      if(!userResponse.rows || userResponse.rows.length === 0){
           return res.status(404).json({
          status: 'error',
          error: 'User not found.',
        });
      }

      const {
        id,
        first_name,
        last_name,
        email,
      } = userResponse.rows[0];

      if(!roleResponse.rows || roleResponse.rows.length <= 0){
           return res.status(404).json({
          status: 'error',
          error: 'User role not found.',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'User fetched successfully',
          userId: id,
          firstName: first_name,
          lastName: last_name,
          email,
          roleId: roleResponse.rows[0].role_id,
        },
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async getStudents(req: Request, res: Response): Promise<Response> {
    try {
       const pageParam = req.params.page as string; 
      const page = Number.parseInt(pageParam, 10);
      const limit = 10;

      if (!Number.isFinite(page) || page <= 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid page number',
        });
      }

      const offset = (page - 1) * limit;

      const [studentsCount, studentsResponse] = await Promise.all([
        pool.query(getLecturerStudentsCount, [req.user?.userId]),
        pool.query(getLecturerStudentsQuery, [req.user?.userId, limit, offset])
      ])

      const totalStudents = studentsCount.rows[0].total_students;

      return res.status(200).json({
        status: 'success',
        data: {
          students: studentsResponse.rows || [],
          totalStudents,
          currentPage: page,
          totalPages: Math.ceil(totalStudents / limit)
        }
      }); 
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async deleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const userId = req.params.userId as string; 
      const parsedUserId = Number.parseInt(userId, 10);

      if (!Number.isFinite(parsedUserId) || parsedUserId <= 0) {
        return res.status(400).json({
          status: 'error',
          error: 'Invalid userId',
        });
      }

      const [deleteUserResult, deleteUserRoleResult] = await Promise.all([
        pool.query(deleteUserRoleQuery, [parsedUserId]),
        pool.query(deleteUserQuery, [parsedUserId])
      ]);

      if (!deleteUserResult.rows || deleteUserResult.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'User not found or already deleted.',
        });
      }

      if (!deleteUserRoleResult.rows || deleteUserRoleResult.rows.length === 0) {
        return res.status(404).json({
          status: 'error',
          error: 'User role not found or already deleted.',
        });
      }

      return res.status(200).json({
        status: 'success',
        data: {
          message: 'User deleted successfully',
        }
      });
    } catch (error) {
      return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }

  async fetchStudentProfile(req: Request, res: Response): Promise<Response> {
    try {
     const  studentEmail = req.user?.email;

     const studentInfo = await pool.query(fetchUserByEmailQuery, [studentEmail])
     if(!studentInfo.rows || studentInfo.rows.length === 0){
      return res.status(404).json({
        status: "error",
        error: "Information not found"
      })
     }

     const { first_name, last_name, role_id } = studentInfo.rows[0]

    return res.status(200).json({
      status: "success",
      data: {
        message: "student information fetched successfully",
        studentId: req.user?.userId,
        firstName: first_name,
        lastName: last_name,
        email: studentEmail,
        department: "Computer Science",
        role: role_id
      }
     })
      
    } catch (error) {
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
    }
  }
}
