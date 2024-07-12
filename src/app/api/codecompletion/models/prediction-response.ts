export interface PredictionResponse {
  prediction?: string[];
  probs?: number[];
  success: boolean;
  message?: string;
}
