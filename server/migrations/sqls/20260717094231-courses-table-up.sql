/* Replace with your SQL commands */

CREATE TABLE courses (
    id SERIAL PRIMARY KEY,
    course_code VARCHAR(15) UNIQUE NOT NULL,
    title VARCHAR(255) NOT NULL,
    lecturer_id INT REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);