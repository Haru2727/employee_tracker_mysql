USE emp_tracker_db;

INSERT INTO department
    (name)
VALUES
    ("Human Resources"),
    ("R&D"),
    ("Engineering"),
    ("Accounting"),
    ("Sales");


INSERT INTO role
    (title, salary, department_id)
VALUES
    ("manager", 75000.00, 2),
    ("engineer", 56000, 3),
    ("accountant", 62500, 4),
    ("recruiter", 60000, 1),
    ("sales person", 85650, 5);

    INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ("John", "Constantine", 1, NULL), 
    ("Johnny", "Utah", 1, 1),
    ("John", "Wick", 3, 2),
    ("Johnny", "Mnemonic", 5, 2);