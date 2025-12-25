import { supabase } from '@/lib/supabase';

export interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    company?: string;
    project_type?: string;
    message: string;
    budget?: string;
    timeline?: string;
    how_found?: string;
}

export async function submitContactForm(formData: ContactFormData): Promise<{ success: boolean; error?: string }> {
    try {
        const { data, error } = await supabase
            .from('contact_submissions')
            .insert([formData])
            .select();

        if (error) {
            console.error('Error submitting contact form:', error);
            return { success: false, error: error.message };
        }

        return { success: true };
    } catch (err) {
        console.error('Exception submitting contact form:', err);
        return { success: false, error: 'An unexpected error occurred' };
    }
}