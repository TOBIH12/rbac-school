import { Request, Response, NextFunction } from 'express';
import pool from '../config/db';
import { getUserPermissionsQuery } from '../queries/user.queries';

const requirePermissions = (requiredPermission: string) => {
    return async (req: Request, res: Response, next: NextFunction) => {
        try {
            if(!req.user){
              return res.status(401).json({
                status: 'error',
                error: 'Unauthorized access: No user information found',
              });
            }

            const roleId = req.user?.roleId;
            // Fetch the user's permissions based on their role from the database
            const userPermissions = await pool.query(getUserPermissionsQuery, [roleId, requiredPermission]);

            if (userPermissions.rows.length === 0) {
                return res.status(403).json({
                    status: 'error',
                    error: 'Forbidden: You do not have the required permissions to access this resource',
                });
            }

          return next(); 

        } catch (error: unknown) {
            return res.status(500).json({
                status: 'error',
                error: 'Internal server error',
            });
        }
    }
}

export default requirePermissions;