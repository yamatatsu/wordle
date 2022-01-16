export type EstimationResult = "wrong" | "containing" | "exact";
export type EstimatedChar = { char: string; result: EstimationResult };
export type EstimatedWord = EstimatedChar[];
