
export interface ToolTemperature{
    actual: number,
    target: number,
    offset: number
}


export default interface TemperatureState {
    tool0: ToolTemperature,
    bed: ToolTemperature
}