const SUPABASE_URL = 'https://zgixhmlshitskkemwyaf.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpnaXhobWxzaGl0c2trZW13eWFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwODYsImV4cCI6MTk4MzY4NDA4Nn0.nMjJ-vp1PSZuD_oT9AQGKADmPu3OCZp9Uf4n2XbaBjQ';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

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

export async function createListItem(item, quantity) {
    const response = await client.from('shopping-list').insert({
        item: item,
        quantity: quantity,
        cross_out: false,
        user_id: client.auth.user().id,
    });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function getListItems() {
    const response = await client
        .from('shopping-list')
        .select()
        .match({ user_id: client.auth.user().id });
    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function editListItem(item) {
    const response = await client
        .from('shopping-list')
        .update({ cross_out: !item.cross_out })
        .match({ id: item.id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}

export async function deleteList() {
    const response = await client.from('shopping-list').delete().match({ user_id: getUser().id });

    if (response.error) {
        console.error(response.error.message);
    } else {
        return response.data;
    }
}
