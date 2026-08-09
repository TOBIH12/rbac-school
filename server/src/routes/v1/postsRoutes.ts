import express from 'express';
import authMiddleware from '../../middleware/authMiddleware';
import validationMiddleware from '../../middleware/validator';
import requirePermissions from '../../middleware/permissions';
import PostsController from '../../controllers/postsContoller';
import { createCourseSchemaDTO, deleteAnnouncementSchemaDTO, enrollCourseSchemaDTO, inputGradeSchemaDTO, postAnnouncementSchemaDTO } from '../../zodSchema';

const router = express();

const postsController = new PostsController();

router.post(
    '/admin/post_announcement',
    authMiddleware,
    requirePermissions("manage_announcements"),
    validationMiddleware(postAnnouncementSchemaDTO),
    postsController.postAnnouncement
);
router.patch(
    '/admin/edit_announcement/:announcementId',
    authMiddleware,
    requirePermissions("manage_announcements"),
    validationMiddleware(postAnnouncementSchemaDTO),
    postsController.editAnnouncement
);
router.delete(
    '/delete_announcement/:announcementId',
    authMiddleware,
    requirePermissions("manage_announcements"),
    validationMiddleware(deleteAnnouncementSchemaDTO),
    postsController.deleteAnnouncement
)
router.get(
    '/fetch_announcements/:page',
    authMiddleware,
    postsController.fetchAnnouncements
)
router.post(
    '/create_course',
    authMiddleware,
    requirePermissions("manage_courses"),
    validationMiddleware(createCourseSchemaDTO),
    postsController.createCourse
)
router.post(
    '/input_grade/:studentId',
    authMiddleware,
    requirePermissions("grade_students"),
    validationMiddleware(inputGradeSchemaDTO),
    postsController.inputGrades
)
router.post(
    '/enroll_course',
    authMiddleware,
    requirePermissions("manage_enrollments"),
    validationMiddleware(enrollCourseSchemaDTO),
    postsController.enrollCourse
)
router.get(
    '/get_courses',
    authMiddleware,
    requirePermissions("grade_students"),
    postsController.getCourses
)

export default router;