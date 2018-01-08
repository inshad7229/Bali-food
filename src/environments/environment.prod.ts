
export interface Environment 
{
	endPoint:string;
}

export const DEV: Environment = {
	endPoint:'http://localhost:5001/api/' 
}

export const PROD: Environment = {
	endPoint:'http://ionicteam.com:5001/api/' 
}
export const environment: Environment= PROD;

