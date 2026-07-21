import express from 'express';
import UsersController from '../../controllers/usersControllers';
import validationMiddleware from '../../middleware/validator';
import requirePermissions from '../../middleware/permissions';
import { createUserSchemaDTO, loginUserSchemaDTO } from '../../zodSchema';
import authMiddleware from '../../middleware/authMiddleware';

const router = express();

const usersController = new UsersController();

router.post(
    '/admin/create_user',
    authMiddleware,
    requirePermissions("manage_users"),
    validationMiddleware(createUserSchemaDTO),
    usersController.createUser
);
router.post(
    '/login',
    validationMiddleware(loginUserSchemaDTO),
    usersController.login
);
router.get(
    '/admin/view_users',
    authMiddleware,
    requirePermissions("manage_users"),
    usersController.adminViewUsers
);
// router.get(
//     '/admin/view_user_by_id/:userId',
// );
// router.get(
//     '/lect/view_course_students',
// )
// router.get(
//     '/student/dashboard',
// )
// router.delete(
//     '/admin/delete_user/:userId'
// )

export default router;