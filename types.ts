export enum AppStep {
  WELCOME = 'WELCOME',
  QUESTIONNAIRE = 'QUESTIONNAIRE',
  UPLOAD = 'UPLOAD',
  ANALYZING = 'ANALYZING',
  RESULTS = 'RESULTS',
}

export interface QuestionOption {
  label: string;
  value: string;
}

export interface Question {
  id: string;
  text: string;
  options: QuestionOption[];
}

export interface UserProfile {
  objective: string;
  splitType: string;
  experience: string;
  weeklySets: string;
  restTime: string;
  exerciseType: string;
  progression: string;
  balance: string;
  junkVolumeFeeling: string;
  functionalHiit: string;
}

export const INITIAL_PROFILE: UserProfile = {
  objective: '',
  splitType: '',
  experience: '',
  weeklySets: '',
  restTime: '',
  exerciseType: '',
  progression: '',
  balance: '',
  junkVolumeFeeling: '',
  functionalHiit: '',
};