import { singleStoreFactory } from '@core/config/single-store';

export interface User_m {
  id?: number;
  role_id?: number;
  name?: string;
  email?: string;
  phone?: string;
  qr_code?: string;
  user_code?: string;
  ref?: string | null;
  business_unit?: string | null;
  business_unit_logo?: string | null;
  is_spk_registered?: boolean;
  points?: number;
  is_claim?: boolean;
  arrival_date?: string;
}

export interface apps {
  appId?: string;
  show?: boolean;
  active?: boolean;
  count_notif?: number;
}

export interface Role_m {
  id?: number;
  people_id?: number;
  branch?: string;
  primary_role_id?: string;
  position_name?: string;
  role_atasan?: string;
  group_id?: number;
  is_active?: string;
  start_date?: string;
  end_date?: string;
  parent_id?: number;
}

export const Entity_User = singleStoreFactory<User_m>();
