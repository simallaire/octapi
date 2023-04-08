
export interface CurrentConnection {
    state: string,
    port: string,
    baudrate: number,
    printerProfile: string
}

export interface ConnectionOptions {
    ports: string[],
    baudrates: number[],
    printerProfiles: {name: string, id: string}[],
    portPreference: string
    baudratePreference: string
    printerProfilePreference: string
    autoconnect: boolean

}
export default interface Connection {
    current: CurrentConnection,
    options: ConnectionOptions
}