/* Replace with your SQL commands */

-- 1. Create the Course (Prof. Bob teaches CS101)
INSERT INTO courses (id, course_code, title, lecturer_id) 
VALUES (201, 'CS101', 'Introduction to Computer Science', 2);

-- 2. Enroll Charlie in CS101
INSERT INTO enrollments (student_id, course_id)
VALUES (3, 201);

-- 3. Prof. Bob directly inputs Charlie's grade for the course
INSERT INTO grades (student_id, course_id, grade_value, feedback, graded_by) 
VALUES (3, 201, 'A', 'Excellent performance on the midterm paper and the final physical exam.', 2);