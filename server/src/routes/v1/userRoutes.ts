import express from 'express';
import UsersController from '../../controllers/usersControllers';
import validationMiddleware from '../../middleware/validator';
import requirePermissions from '../../middleware/permissions';
import { adminGetSpecificUserSchemaDTO, adminViewUsersSchemaDTO, createUserSchemaDTO, getStudentsSchemaDTO, loginUserSchemaDTO } from '../../zodSchema';
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
    '/admin/view_users/:page',
    authMiddleware,
    requirePermissions("manage_users"),
    validationMiddleware(adminViewUsersSchemaDTO),
    usersController.adminViewUsers
);
router.get(
    '/admin/view_specific_user/:userId',
    authMiddleware,
    requirePermissions("manage_users"),
    validationMiddleware(adminGetSpecificUserSchemaDTO),
    usersController.adminViewSpecificUser
);
router.get(
    '/lect/view_students/:page',
    authMiddleware,
    requirePermissions("view_students"),
    validationMiddleware(getStudentsSchemaDTO),
    usersController.getStudents
)
router.delete(
    '/admin/delete_user/:userId',
    authMiddleware,
    requirePermissions("manage_users"),
    validationMiddleware(adminGetSpecificUserSchemaDTO),
    usersController.deleteUser
)

export default router;