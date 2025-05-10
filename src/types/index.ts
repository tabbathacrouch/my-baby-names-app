export interface BabyName {
  name: string;
  meaning: string;
  origin: string;
  popularity?: string;
  link?: string;
}

export interface ResultsProps {
  likedNames: BabyName[];
  dislikedNames: BabyName[];
}

export interface FormValues {
  fromName: string;
  userEmail: string;
}
