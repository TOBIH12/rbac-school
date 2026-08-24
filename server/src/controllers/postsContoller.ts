import { Request, Response } from 'express';
import dotenv from 'dotenv';
import pool from '../config/db.ts';
import { checkCourseEnrollmentQuery, checkStudentGradeQuery, createCourseQuery, deleteAnnouncementQuery, editAnnouncementQuery, enrollCourseQuery, fetchCourseInfoByIdquery, getAllAnnouncementsQuery, getAnnouncementByIdQuery, getLecturerCoursesQuery, inputStudentGradeQuery, postAnnouncementQuery } from '../queries/posts.queries.ts';
import { fetchUserByEmailQuery, fetchUserByIdQuery } from '../queries/user.queries.ts';

dotenv.config();


export default class PostsController {
    async postAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const {title, content} = req.body;
            const creatorId = req.user?.userId;

            const result = await pool.query(postAnnouncementQuery, [title, content, creatorId]);
            if(!result.rows || result.rows.length === 0) {
                return res.status(400).json({
                    status: 'error',
                    error: 'Failed to create announcement',
                });
            }

            const announcement = result.rows[0];

            return res.status(201).json({
                status: 'success',
                data: {
                    message: 'Announcement posted successfully',
                    announcementId: announcement.announcements_id,
                    title: announcement.title,
                    content: announcement.content,
                    createdAt: announcement.created_on,
                    creatorId: creatorId
                }
            });    
        } catch (error) {
        console.error('Error posting announcement:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async editAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const { title, content } = req.body;
            const userId = req.user?.userId;
            const announcementId = req.params.announcementId as string;

            const parsedAnnouncementId = Number.parseInt(announcementId, 10);
            if (isNaN(parsedAnnouncementId)) {
                return res.status(400).json({
                    status: 'error',
                    error: 'Invalid announcement ID',
                });
            }

            const updateResult = await pool.query(editAnnouncementQuery, [title, content, parsedAnnouncementId]);
            if (!updateResult.rows || updateResult.rows.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    error: 'Announcement not found or failed to update',
                });
            }

            const updatedAnnouncement = updateResult.rows[0];

            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Announcement updated successfully',
                    title: updatedAnnouncement.title,
                    content: updatedAnnouncement.content,
                    updatedAt: new Date(),
                    updatedBy: userId
                }
            });
        } catch (error) {
            console.error('Error editing announcement:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async deleteAnnouncement(req: Request, res: Response): Promise<Response> {
        try {
            const announcementId = req.params.announcementId as string;

            const parsedAnnouncementId = parseInt(announcementId, 10);

            const checkAnnouncement = await pool.query(getAnnouncementByIdQuery, [parsedAnnouncementId]);
            if (!checkAnnouncement.rows || checkAnnouncement.rows.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    error: 'Announcement not found',
                });
            }

            const deleteResult = await pool.query(deleteAnnouncementQuery, [parsedAnnouncementId]);
            if (!deleteResult.rows || deleteResult.rows.length === 0) {
                return res.status(404).json({
                    status: 'error',
                    error: 'Announcement not found or failed to delete',
                });
            }

            return res.status(200).json({
                status: 'success',
                data: {
                    message: 'Announcement deleted successfully',
                    deletedAt: new Date(),
                    deletedBy: req.user?.userId
                }
            });
        } catch (error) {
        console.error('Error deleting announcement:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async fetchAnnouncements(req: Request, res: Response): Promise<Response> {
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

      const announcementsResult = await pool.query(getAllAnnouncementsQuery, [limit, offset]);
      if (!announcementsResult.rows || announcementsResult.rows.length === 0) {
        return res.status(200).json({
          status: 'error',
          error: 'There are no announcements available at the moment.',
        });
      }
      
     return res.status(200).json({
        status: 'success',
        data: {
          message: 'Announcements fetched successfully',
          announcements: announcementsResult.rows,
        },
      })
            
        } catch (error) {
        console.error('Error retrieving announcement:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async createCourse(req: Request, res: Response): Promise<Response> {
        try {
            const {courseCode, title, lecturerEmail} = req.body;
            const creatorLastName = req.user?.lastName;
            const email = lecturerEmail.toLowerCase()

            const [courseExists, checkLecturer] = await Promise.all([
                pool.query(fetchCourseInfoByIdquery, [courseCode]),
                pool.query(fetchUserByEmailQuery, [email])
            ])

           if (courseExists.rows && courseExists.rows.length > 0) {
        return res.status(400).json({
          status: 'error',
          error: 'course already exists',
        });
      }

      if(!checkLecturer.rows || checkLecturer.rows.length === 0){
        return res.status(404).json({
            status: 'error',
            error: 'Lecturer not found or has not been registered.'
        })
      }

      const lecturerInfo = checkLecturer.rows[0];

      const courseResponse = await pool.query(createCourseQuery, [courseCode, title, lecturerInfo.user_id]);
      if(!courseResponse.rows || courseResponse.rows.length === 0){
         return res.status(400).json({
            status: 'error',
            error: 'Failed to create course, try again.'
        })
      }

      const { id, course_code, created_at} = courseResponse.rows[0];

      return res.status(201).json({
                 status: 'success',
                 data: {
                    message: "Course Created Successfully",
                    courseId: id,
                    courseCode: course_code,
                    title: title,
                    lecturer: lecturerInfo.first_name + " " + lecturerInfo.last_name,
                    createdAt: created_at,
                    createdBy: `Admin ${creatorLastName}`
                 }
            });
            
        } catch (error) {
             console.error('Error creating course:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async inputGrades(req: Request, res: Response): Promise<Response> {
        try {
            const { courseCode, grade, feedback } = req.body;
            const gradedBy = req.user?.userId;
            const studentId = req.params.studentId as string

            const parsedStudentId = Number.parseInt(studentId, 10);

            const [studentExists, courseExists] = await Promise.all([
                pool.query(fetchUserByIdQuery, [parsedStudentId]),
                pool.query(fetchCourseInfoByIdquery, [courseCode])
            ]);

            if(!studentExists.rows || studentExists.rows.length === 0){
                return res.status(404).json({
                    status: 'error',
                    error: 'Student is unexpectedly unfound, please try again.',
                });
            }

            if(!courseExists.rows || courseExists.rows.length === 0){
                return res.status(404).json({
                    status: 'error',
                    error: 'Course is missing or not registered.',
                });
            }

            const { course_id, lecturer_id } = courseExists.rows[0];

            if(gradedBy !== lecturer_id){
                return res.status(403).json({
                    status: 'error',
                    error: `You are not authorized to grade students on ${courseCode}, as you do not teach it.`,
                });
            }

            const [checkGradeExists, checkEnrollment] = await Promise.all([
                 pool.query(checkStudentGradeQuery, [parsedStudentId, course_id]),
                  pool.query(checkCourseEnrollmentQuery, [parsedStudentId, course_id])
            ])

            if(checkGradeExists.rows && checkGradeExists.rows.length > 0){
                return res.status(400).json({
                    status: 'error',
                    error: `This student is already graded in ${courseCode}.`
                })
            }
            
            if(!checkEnrollment.rows || checkEnrollment.rows.length === 0){
                 return res.status(400).json({
                    status: 'error',
                    error: `This student has not registered course ${courseCode}.`
                })
            }

            const gradeValues = [
                parsedStudentId,
                course_id,
                grade,
                feedback,
                gradedBy
            ]

            const inputGrade = await pool.query(inputStudentGradeQuery, gradeValues);
            if(!inputGrade.rows || inputGrade.rows.length === 0){
                return res.status(400).json({
                    status: 'error',
                    error: 'Failed to input grade, try again.',
                })
            }

            const {id, student_id, grade_value, graded_by, graded_at} = inputGrade.rows[0];

            return res.status(201).json({
                 status: 'success',
                 data: {
                    message: "Grade saved!",
                    gradeId: id,
                    studentId: student_id,
                    courseId: course_id,
                    grade: grade_value,
                    gradedBy: req.user?.firstName,
                    gradedAt: graded_at
                 }
            });
            
        } catch (error) {
            console.error('Error saving grade:', error);
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async enrollCourse(req: Request, res: Response): Promise<Response> {
        try {
            const { courseCode } = req.body
            const studentId = req.user?.userId

            const checkCourse = await pool.query(fetchCourseInfoByIdquery, [courseCode]);

            if(!checkCourse.rows || checkCourse.rows.length === 0){
                return res.status(404).json({
                    status: 'error',
                    error: `Course ${courseCode} was not found, recheck name and try again.`
                })
            }

            const checkEnrollment = await pool.query(checkCourseEnrollmentQuery, [studentId, checkCourse.rows[0].course_id]);

            if(checkEnrollment.rows && checkEnrollment.rows.length > 0){
                return res.status(400).json({
                    status: 'error',
                    error: `Course ${courseCode} has already been registered.`
                })
            }

                const {course_id, lecturer_id} = checkCourse.rows[0];
    
                const [enrollCourse, checkLecturer] = await Promise.all([
                    pool.query(enrollCourseQuery, [studentId, course_id]),
                    pool.query(fetchUserByIdQuery, [lecturer_id])
                ]);
                if(!enrollCourse.rows || enrollCourse.rows.length === 0){
                     return res.status(400).json({
                        status: 'error',
                        error: `Course enrollment has failed, try again later.`
                    })
                }

                const {first_name, last_name} = checkLecturer.rows[0];

                return res.status(201).json({
                    status: 'success',
                    data: {
                        message: 'Course enrolled successfully',
                        courseId: course_id,
                        courseCode: courseCode,
                        lecturer: `${last_name} ${first_name}`
                    }
                });
            
        } catch (error) {
        return res.status(500).json({
        status: 'error',
        error: (error as string) || 'Server Error',
      });
        }
    }

    async getCourses(req: Request, res: Response): Promise<Response> {
        try {
            const lecturerId = req.user?.userId

            const coursesResponse = await pool.query(getLecturerCoursesQuery, [lecturerId])
           

            return res.status(200).send({
                status: "success",
                data: {
                    message: "courses fetched successfully",
                    courses: coursesResponse.rows
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