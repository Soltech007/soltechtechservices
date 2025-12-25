import { supabase } from './supabase'

// FIXED VERSION
export function getStorageUrl(path: string | null | undefined): string | null {
    // Null/undefined check
    if (!path) {
        return null;
    }

    // ⭐ IMPORTANT: Agar already full URL hai to WAHI return karo
    if (path.startsWith('http://') || path.startsWith('https://')) {
        return path; // SEEDHA RETURN - koi processing nahi
    }

    // Only convert if it's a relative path
    const { data } = supabase.storage
        .from('project-images')
        .getPublicUrl(path);

    return data?.publicUrl || null;
}