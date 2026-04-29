export interface Wedding {
  id: string;
  template_id: string;
  wedding_date: string;
  bride_name: string;
  groom_name: string;
  venue_name: string;
  host_selection: 'bride_side' | 'groom_side';
  bride_father_name?: string;
  bride_mother_name?: string;
  bride_place?: string;
  groom_father_name?: string;
  groom_mother_name?: string;
  groom_place?: string;
  venue_address?: string;
  google_maps_url?: string;
  custom_message?: string;
  islamic_date?: string;
  nikah_date?: string;
  nikah_time?: string;
  nikah_islamic_date?: string;
  nikah_location?: string;
  [key: string]: unknown;
}
