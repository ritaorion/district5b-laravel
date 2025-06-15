export interface SiteSetting {
    id: number;
    blog_mod_enabled: boolean;
    events_mod_enabled: boolean;
    faqs_mod_enabled: boolean;
    resources_mod_enabled: boolean;
    meetings_mod_enabled: boolean;
    roster_mod_enabled: boolean;
    copyright_text_enabled: boolean;
    copyright_text_content: string | null;
    notify_contact_form_submission: boolean;
    notify_contact_form_email: string | null;
    site_title: string;
    site_alert_enabled: boolean;
    site_alert_content: string | null;
    created_at: string;
    updated_at: string;
}
