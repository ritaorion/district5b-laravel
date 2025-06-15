export interface Document {
    id: number;
    file_name: string;
    original_file_name: string;
    file_size: number;
    mime_type: string;
    app_type: string;
    uploaded_by: number;
    storage_path: string;
    is_public: boolean;
    created_at: string;
    updated_at: string;
}
