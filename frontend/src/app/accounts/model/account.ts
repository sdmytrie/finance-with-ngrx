export interface Account {
  _id: string;
  name: string;
  iban: string;
  bic: string;
  bank: string;
  is_favorite: boolean;
  balance: number;
  timetable: number;
  quality: string;
  user_id: string;
}
