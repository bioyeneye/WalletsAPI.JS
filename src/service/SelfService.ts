import { BalanceSelfRequestModel } from "../model/requests/self.request.model";
import { Observable, throwError, from } from "rxjs";
import { catchError, map } from "rxjs/operators";
import { BaseResponseMode } from "../model/response/base.response.model";
import { SelfBalanceResponseModel } from "../model/response/self.response.model";
import { endpoints } from "../core/endpoint";
import Axios from "axios-observable";
import { IWalletServiceConfig } from "../core/config";

export interface ISelfService {
    getBalance(request: BalanceSelfRequestModel): Observable<BaseResponseMode<SelfBalanceResponseModel>>;
}

export class SelfService implements ISelfService {
    http: Axios;
    config: IWalletServiceConfig;

    constructor(config: IWalletServiceConfig, http: Axios) {
        this.http = http;
        this.config = config;
    }

    getBalance(request: BalanceSelfRequestModel): Observable<BaseResponseMode<SelfBalanceResponseModel>> {
        request.SecretKey = this.config.secretkey;
        return this.http.post<BaseResponseMode<SelfBalanceResponseModel>>(endpoints.self.balance, request, {
            headers: { 'Content-Type': 'application/json', }
        })
            .pipe(map(result => {
                return result.data;
            }), catchError((error) => {
                return throwError(error);
            }));
    }

}