export const postAnnouncementQuery = `INSERT INTO "announcements" (title, content, creator_id) VALUES ($1, $2, $3) RETURNING *`;

export const editAnnouncementQuery = `UPDATE "announcements" SET title = $1, content = $2 WHERE announcements_id = $3 RETURNING *`;

export const getAllAnnouncementsQuery = `SELECT * FROM "announcements" ORDER BY created_on DESC LIMIT $1 OFFSET $2`;

export const getAnnouncementByIdQuery = `SELECT * FROM "announcements" WHERE announcements_id = $1`;

export const deleteAnnouncementQuery = `DELETE FROM "announcements" WHERE announcements_id = $1 RETURNING *`;

export const createCourseQuery = `INSERT INTO "courses" (course_code, title, lecturer_id) VALUES ($1, $2, $3) RETURNING *`

export const fetchCourseInfoByIdquery = `SELECT id AS course_id, lecturer_id FROM "courses" WHERE course_code = $1`;

export const checkStudentGradeQuery = `SELECT * FROM "grades" WHERE student_id = $1 AND course_id = $2`;

export const inputStudentGradeQuery = `INSERT INTO "grades" (student_id, course_id, grade_value, feedback, graded_by) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

export const checkCourseEnrollmentQuery = `SELECT enrolled_at FROM "enrollments" WHERE student_id = $1 AND course_id = $2`;

export const enrollCourseQuery = `INSERT INTO "enrollments" (student_id, course_id) VALUES ($1, $2) RETURNING *`;

export const getLecturerCoursesQuery = `SELECT course_code FROM "courses" WHERE lecturer_id = $1`
