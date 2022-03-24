interface UserRegisterDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: number;
  avatar_url?: string | null;
  bio?: string | null;
  created_at?: Date | null;
  updated_at?: Date | null;
}

export { UserRegisterDto };
