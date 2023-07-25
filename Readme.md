# How to run Jobly
This guide will help you to create local Jobly App.

## Create DB
You should have Postgres on your local machine create a database names job_postings.
enter the psql terminal and run following commands:

```
CREATE TABLE job_postings (
  JobID TEXT,
  CompanyID TEXT,
  CompanyName TEXT,
  JobOpeningDate TIMESTAMP,
  JobClosingDate TIMESTAMP,
  Status TEXT,
  salary_calc TEXT,
  salary_type TEXT,
  annual_salary_avg FLOAT,
  annual_salary_min FLOAT,
  annual_salary_max FLOAT,
  number_of_hires_calc INTEGER,
  JobTitle TEXT,
  Industry TEXT,
  ZipCode TEXT,
  City TEXT,
  State TEXT,
  Certification TEXT,
  Skill TEXT,
  SkillWeights TEXT,
  SoftSkill TEXT,
  SoftSkillWeights TEXT,
  Qualification TEXT,
  DegreeMin TEXT,
  DegreeLevel TEXT,
  SOC TEXT,
  SOCProbability FLOAT,
  NormalizedTitle TEXT
);

copy data over to table we created
```
\copy job_postings FROM 'path-to-csv/01-2023_Monthly_Results.csv' DELIMITER ',' CSV HEADER;

```

create indexes for faster querying

```
CREATE INDEX idx_job_postings_job_id ON job_postings ("JobID");
CREATE INDEX idx_job_postings_job_title ON job_postings ("JobTitle");
CREATE INDEX idx_job_postings_company_name ON job_postings ("CompanyName");
CREATE INDEX idx_job_postings_opening_date ON job_postings ("JobOpeningDate");
CREATE INDEX idx_job_postings_location ON job_postings ("City");
```

## Install dependencies
    Open up a terminal navigate to backend folder then frontend folder run for both:

```
    npm install
```

  Navigate backend folder run

```
    npm run dev
```
Navigate frontend folder run
```
    npm run start
```

App should be available on localhost:3000# data-read-task
