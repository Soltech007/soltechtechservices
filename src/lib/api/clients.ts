import { supabase } from '@/lib/supabase';

export interface Client {
    client_id: number;
    client_name: string;
    logo_url: string;
    website_url?: string;
    description?: string;
    is_featured: boolean;
    display_order: number;
}

export async function getFeaturedClients(): Promise<Client[]> {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('is_featured', true)
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }

    return data || [];
}

export async function getAllClients(): Promise<Client[]> {
    const { data, error } = await supabase
        .from('clients')
        .select('*')
        .order('display_order', { ascending: true });

    if (error) {
        console.error('Error fetching clients:', error);
        return [];
    }

    return data || [];
}