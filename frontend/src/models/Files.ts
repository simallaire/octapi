
export interface File {
    date: number;
    display: string;
    gcodeAnalysis: {
      dimensions: {
        depth: number;
        height: number;
        width: number;
      };
      estimatedPrintTime: number;
      filament: {
        tool0: {
          length: number;
          volume: number;
        };
      };
      printingArea: {
        maxX: number;
        maxY: number;
        maxZ: number;
        minX: number;
        minY: number;
        minZ: number;
      };
    };
    hash: string;
    name: string;
    origin: string;
    path: string;
    prints: {
      failure: number;
      last: {
        date: number;
        success: boolean;
      };
      success: number;
    };
    refs: {
      download: string;
      resource: string;
    };
    size: number;
    statistics: {
      averagePrintTime: Record<string, unknown>;
      lastPrintTime: Record<string, unknown>;
    };
    type: string;
    typePath: string[];
}

export default interface Files {
    files: File[];
    total: number;
    free: number;
}