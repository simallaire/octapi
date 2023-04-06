
export interface Flags{
    operational: boolean,
    pause: boolean,
    printing: boolean,
    pausing: boolean
    cancelling: boolean,
    sdReady: boolean,
    error: boolean,
    ready: boolean
    closedOnError: boolean  
}
export default interface PrinterState  {
    text: string | null,
    flags: Flags | null
    error: string | null,
}