import { SelfService, ISelfService } from './service/SelfService'
import { config } from 'rxjs';
import Axios from 'axios-observable';
import { IWalletServiceConfig } from './core/config';

/**
 * Wallet service - pass the config
 */
export class Wallet {

    private config: IWalletServiceConfig;
    private http: Axios;

    /**
     * Pass the values
     * @param config 
     */
    constructor(config: IWalletServiceConfig) {
        this.config = config;
        this.http = Axios.create({
            baseURL: this.config.url,
            timeout: 2500
        })
        this.http.defaults.headers.common['Authorization'] = `Bearer ${this.config.publickey}`;
        this.http.defaults.headers.post['Content-Type'] = 'application/json';
    }

    selfService(): SelfService {
        return new SelfService(this.config, this.http);
    }
}