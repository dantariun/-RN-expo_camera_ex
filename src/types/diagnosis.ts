export interface TongueRecord {
  tonguePhotoUri: string;
  userName: string;
  healthStatus: string;
  diagnosisDate: string;
}

export interface DementiaRecord {
  probability: number;
  status: string;
  diagnosisDate: string;
}
