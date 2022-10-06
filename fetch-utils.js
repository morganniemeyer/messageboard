const SUPABASE_URL = 'https://sokdbdmizbnabxtgwugf.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNva2RiZG1pemJuYWJ4dGd3dWdmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjQ4MzEzNzAsImV4cCI6MTk4MDQwNzM3MH0.P1lyvBO99WR6qLAnNFo3UWYALquWv5tZbeEtY-869V4';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);
/*SUPABASE table name = message*/

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
