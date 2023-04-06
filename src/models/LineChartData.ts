
export interface LineDatasets{
    label: string;
    data: Number[]
    borderColor: string;
    backgroundColor: string;
}

export default interface LineChartData {
    labels: string[];
    datasets: LineDatasets[];
}