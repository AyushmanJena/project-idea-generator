export interface RequestModel{
  platform : string;
  userBase : string;
  userExpertise : string;
  userTechStack: string;
}

export interface ResponseModel {
  platforms: string[];
  userBases:  string[];
}
