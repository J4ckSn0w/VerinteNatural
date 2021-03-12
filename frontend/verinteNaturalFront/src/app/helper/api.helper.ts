import { split } from "ts-node";

export class ApiHelper{
    fnSetParams(params:Array<any>,str_api:string):any{
        let str_apiWithParams:string = "";
        if((str_api.split("?").length-1)!=params.length){
            return {_success:false,_message:"Parametros incorrectos"}
        }

        for( let index = 0; index < str_api.split("?").length; index++ ){
            str_apiWithParams = str_apiWithParams + str_api.split("?")[index] + (params[index]!=null?(params[index]+""):"");
        }
        return{_success:true,_message:str_apiWithParams}
    }
}