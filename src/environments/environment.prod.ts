
export interface Environment 
{
	endPoint:string;
}

export const DEV: Environment = {
	endPoint:'http://localhost:8080/api/' 
}

export const PROD: Environment = {
	endPoint:'http://ionicteam.com:8080/api/' 
}
export const environment: Environment= PROD;

