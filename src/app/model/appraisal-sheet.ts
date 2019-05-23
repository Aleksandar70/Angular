import {User} from './user';

export class AppraisalSheet {
  appraisalSheetID: number;
  user: User;
  date: Date;
  employeeName: String;
  division: String;
  careerLevel: String;
  appraisalPeriod: String;
  manager: String;
  tasksBackdated: String;
  teamLeadFeedback: String;
  companyFeedback: String;
  targetsBackdated: String;
  roleRequirements: String;
  selfCompetence: String;
  socialCompetence: String;
  methodicalCompetence: String;
  roleRequirementsGoals: String;
  selfCompetenceGoals: String;
  companyOrientedGoals: String;
  economicGoal: String;
  developmentObjectives: String;
  developmentPotential: String;
  employeeExpectations: String;
  locked: boolean;

  constructor(employeeName: String, division: String, careerLevel: String, appraisalPeriod: String, manager: String, tasksBackdated: String,
              teamLeadFeedback: String, companyFeedback: String, targetsBackdated: String, roleRequirements: String, selfCompetence: String,
              socialCompetence: String, methodicalCompetence: String, roleRequirementsGoals: String, selfCompetenceGoals: String,
              companyOrientedGoals: String, economicGoal: String, developmentObjectives: String, developmentPotential: String,
              employeeExpectations: String) {
    this.date = new Date();
    this.employeeName = employeeName;
    this.division = division;
    this.careerLevel = careerLevel;
    this.appraisalPeriod = appraisalPeriod;
    this.manager = manager;
    this.tasksBackdated = tasksBackdated;
    this.teamLeadFeedback = teamLeadFeedback;
    this.companyFeedback = companyFeedback;
    this.targetsBackdated = targetsBackdated;
    this.roleRequirements = roleRequirements;
    this.selfCompetence = selfCompetence;
    this.socialCompetence = socialCompetence;
    this.methodicalCompetence = methodicalCompetence;
    this.roleRequirementsGoals = roleRequirementsGoals;
    this.selfCompetenceGoals = selfCompetenceGoals;
    this.companyOrientedGoals = companyOrientedGoals;
    this.economicGoal = economicGoal;
    this.developmentObjectives = developmentObjectives;
    this.developmentPotential = developmentPotential;
    this.employeeExpectations = employeeExpectations;
    this.locked = false;
  }

  lockAppSheet() {
    this.locked = true;
  }
}
