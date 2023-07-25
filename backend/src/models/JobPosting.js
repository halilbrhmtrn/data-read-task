const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db.js');

const JobPosting = sequelize.define('job_postings', {
  JobID: {
    type: DataTypes.TEXT,
    allowNull: true,
    primaryKey: true,
  },
  CompanyID: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  CompanyName: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  JobOpeningDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  JobClosingDate: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  Status: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  salary_calc: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  salary_type: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  annual_salary_avg: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  annual_salary_min: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  annual_salary_max: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  number_of_hires_calc: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  JobTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Industry: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  ZipCode: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  City: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  State: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Certification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Skill: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SkillWeights: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SoftSkill: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SoftSkillWeights: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  Qualification: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  DegreeMin: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  DegreeLevel: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SOC: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  SOCProbability: {
    type: DataTypes.FLOAT,
    allowNull: true,
  },
  NormalizedTitle: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
},
{
  timestamps: false,
  indexes: [
    { fields: ['JobTitle'] },
    { fields: ['CompanyName'] },
    { fields: ['JobOpeningDate'] },
    { fields: ['Location'] },
    { fields: ['JobType'] }
  ]
}
);

module.exports = {
  JobPosting,
};
