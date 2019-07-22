import {UserDto} from './userDto';

export class ProjectEvaluation {
  projectEvaluationID: number;
  userDto: UserDto;
  date: Date;
  employeeName: String;
  projectName: String;
  careerLevel: String;
  appraisalPeriod: String;
  manager: String;
  financialSituation: String;
  tasksDifficult: String;
  scope: String;
  functionalSpecification: String;
  hardToFollow: String;
  independent: String;
  suggestions: String;
  projectInFiveMonths: String;
  obstacles: String;
  best_sides_highlights: String;
  humanResources: String;
  peopleSatisfaction: String;
  feedbackFromClient: String;
  improvingProcess: String;
  time: String;
  locked: boolean;

  constructor(employeeName: String, projectName: String, careerLevel: String, appraisalPeriod: String, manager: String, financialSituation: String,
              tasksDifficult: String, scope: String, functionalSpecification: String, hardToFollow: String, independent: String,
              suggestions: String, projectInFiveMonths: String, obstacles: String, best_sides_highlights: String,
              humanResources: String, peopleSatisfaction: String, feedbackFromClient: String, improvingProcess: String,
              time: String) {
    this.date = new Date();
    this.employeeName = employeeName;
    this.projectName = projectName;
    this.careerLevel = careerLevel;
    this.appraisalPeriod = appraisalPeriod;
    this.manager = manager;
    this.financialSituation = financialSituation;
    this.tasksDifficult = tasksDifficult;
    this.scope = scope;
    this.functionalSpecification = functionalSpecification;
    this.hardToFollow = hardToFollow;
    this.independent = independent;
    this.suggestions = suggestions;
    this.projectInFiveMonths = projectInFiveMonths;
    this.obstacles = obstacles;
    this.best_sides_highlights = best_sides_highlights;
    this.humanResources = humanResources;
    this.peopleSatisfaction = peopleSatisfaction;
    this.feedbackFromClient = feedbackFromClient;
    this.improvingProcess = improvingProcess;
    this.time = time;
    this.locked = false;
  }

  lockAppSheet() {
    this.locked = true;
  }
}
