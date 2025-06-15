export interface User {
    id: number;
    username: string;
    first_name: string;
    last_name: string;
    is_admin: boolean;
    email: string;
    created_at: string;
    updated_at: string;
    email_verified_at?: string;
}
