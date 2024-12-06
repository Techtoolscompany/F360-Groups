import { createClient } from '@supabase/supabase-js';
import { Database } from '../types/database';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
  db: {
    schema: 'public'
  }
});

export async function checkPermission(resource: string, action: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase.rpc('check_permission', {
    user_id: user.id,
    resource,
    action
  });

  if (error) {
    console.error('Error checking permission:', error);
    return false;
  }

  return data;
}

export async function assignRole(userId: string, newRole: string): Promise<boolean> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return false;

  const { data, error } = await supabase.rpc('assign_role', {
    user_id: userId,
    new_role: newRole,
    assigner_id: user.id
  });

  if (error) {
    console.error('Error assigning role:', error);
    return false;
  }

  return data;
}

export async function logAdminAction(
  action: string,
  targetId: string,
  targetType: string,
  details: any
): Promise<void> {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const { error } = await supabase
    .from('admin_logs')
    .insert({
      admin_id: user.id,
      action,
      target_id: targetId,
      target_type: targetType,
      details
    });

  if (error) {
    console.error('Error logging admin action:', error);
  }
}