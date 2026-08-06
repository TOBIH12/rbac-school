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

export const adminViewUsersSchemaDTO = z.object({
  params: z.object({
    page: z.coerce
      .number('Invalid page number')
      .int('Invalid page number')
      .positive('Invalid page number'),
  }),
});

export const adminGetSpecificUserSchemaDTO = z.object({
    params: z.object({
        userId: z.coerce
      .number('Invalid userId')
      .int('Invalid userId')
      .positive('Invalid userId'),
    })
})

export const getStudentsSchemaDTO = z.object({
     params: z.object({
        page: z.coerce
      .number('Invalid page number')
      .int('Invalid page number')
      .positive('Invalid page number'),
    })
})

// POST SCHEMAS

export const postAnnouncementSchema = z.object({
     title: z.string().min(1, 'Title is required').max(100),
     content: z.string().min(1, 'Content is required'),
})

export const postAnnouncementSchemaDTO = z.object({
    body: postAnnouncementSchema
})

export const deleteAnnouncementSchemaDTO = z.object({
    params: z.object({
        announcementId: z.coerce
            .number('Invalid announcement ID')
            .int('Invalid announcement ID')
            .positive('Invalid announcement ID')
    })
})

export const createCourseSchema = z.object({
    courseCode: z.string().min(1, 'Course Code is required').max(6),
    title: z.string().min(1, 'Feedback is required').max(50),
    lecturerEmail: z.string().email({ message: 'Invalid email address' }),
})

export const createCourseSchemaDTO = z.object({
    body: createCourseSchema
})

export const inputGradeSchema = z.object({
    courseCode: z.string().min(1, 'Course Code is required').max(6),
    grade: z.string().min(1, 'Grade is required').min(1).max(1),
    feedback: z.string().min(1, 'Feedback is required').max(50),
})

export const inputGradeSchemaDTO = z.object({
    body: inputGradeSchema
})

export const enrollCourseSchema = z.object({
    courseCode: z.string().min(1, 'Course Code is required').max(6),
})

export const enrollCourseSchemaDTO = z.object({
    body: enrollCourseSchema
})
