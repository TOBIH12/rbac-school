/* Replace with your SQL commands */

CREATE TABLE grades (
    id SERIAL PRIMARY KEY,
    student_id INT REFERENCES users(id) ON DELETE CASCADE,
    course_id INT REFERENCES courses(id) ON DELETE CASCADE,
    grade_value VARCHAR(5) NOT NULL, -- e.g., 'A', 'B+', '95'
    feedback TEXT,
    graded_by INT REFERENCES users(id) ON DELETE SET NULL, -- The Lecturer who input the grade
    graded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT unique_student_course_grade UNIQUE (student_id, course_id)
);