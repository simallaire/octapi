
export interface ToolTempratureRow {
    actual: number;
    target: number;
}

export default interface TemperatureHistory {
    bed : ToolTempratureRow,
    tool0: ToolTempratureRow,
    time: number
}   

