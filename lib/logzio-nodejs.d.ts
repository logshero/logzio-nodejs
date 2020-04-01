interface ILoggerOptions {
    token: string;
    host?: string;
    type? : string;
    sendIntervalMs? : number;
    bufferSize? : number;
    debug? : boolean;
    numberOfRetries? : number;
    supressErrors?  : boolean;
    addTimestampWithNanoSecs? : boolean;
    compress? : boolean;
    internalLogger? : { log(message: string, ...args): any } & Record<string, any>;
    protocol? : string;
    port : string;
    timeout? : number;
    sleepUntilNextRetry? : number;
    callback(err: Error, bulk: object): void;
    extraFields? : {};
}

interface ILogzioLogger extends ILoggerOptions{
    jsonToString(json: string): string;
    log(msg: string): void;
    close(): void;
    sendAndClose(callback: (error: Error, bulk: object) => void): void;
    padNumberWithZeros(nanosec_timestamp: number);
}

export function createLogger(options: ILoggerOptions): ILogzioLogger;
export function jsonToString(json: string): string;