import asyncStorage from '../../chrome/common/async-storage';
import Initializable from "../../chrome/interface/initializable";

/**
 * Config for cryptor
 * 
 * @author zhy
 * @date 20201201
 */
class CryptorConfig implements Initializable {

    private static KEY: string = '__CryptorConfig__'

    private config: any = {
        password: '123456',
        autoFill: false
    }

    initialize(): void { this.changePassword('123456') }

    public changePassword(psw: string) {
        this.config.password = psw
        asyncStorage.setAsync(CryptorConfig.KEY, this.config)
    }

    public getPassword(callback?: Function): string {
        this.init((config: any) => callback && callback(config.password))

        return this.config.password // for sync forced
    }

    public changeAutoFill(autoFill: boolean) {
        this.config.autoFill = autoFill
        asyncStorage.setAsync(CryptorConfig.KEY, this.config)
    }

    public getAutoFill(callback?: Function): boolean {
        this.init((config: any) => callback && callback(!!config.autoFill))
        return this.config.autoFill
    }

    private static INSTANCE: CryptorConfig

    private constructor() {
        this.init()
    }

    private init(callback?: Function) {
        asyncStorage.getAsync(CryptorConfig.KEY, (config: any) => {
            if (config) this.config = config
            callback && callback(this.config)
        })
    }

    public static getInstance(): CryptorConfig {
        if (CryptorConfig.INSTANCE == null) CryptorConfig.INSTANCE = new CryptorConfig()
        return CryptorConfig.INSTANCE
    }
}

export default CryptorConfig.getInstance()

