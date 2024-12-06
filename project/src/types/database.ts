export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          username: string
          full_name: string
          avatar_url: string
          role: 'admin' | 'master_admin' | 'pastor' | 'moderator' | 'member'
          is_active: boolean
          assigned_by: string | null
          assigned_at: string | null
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string
          avatar_url?: string
          role?: 'admin' | 'master_admin' | 'pastor' | 'moderator' | 'member'
          is_active?: boolean
          assigned_by?: string | null
          assigned_at?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string
          avatar_url?: string
          role?: 'admin' | 'master_admin' | 'pastor' | 'moderator' | 'member'
          is_active?: boolean
          assigned_by?: string | null
          assigned_at?: string | null
        }
      }
      role_permissions: {
        Row: {
          id: string
          role: string
          resource: string
          action: string
          created_at: string
        }
        Insert: {
          id?: string
          role: string
          resource: string
          action: string
          created_at?: string
        }
        Update: {
          id?: string
          role?: string
          resource?: string
          action?: string
          created_at?: string
        }
      }
      admin_logs: {
        Row: {
          id: string
          admin_id: string
          action: string
          target_id: string
          target_type: string
          details: Json
          created_at: string
        }
        Insert: {
          id?: string
          admin_id: string
          action: string
          target_id: string
          target_type: string
          details?: Json
          created_at?: string
        }
        Update: {
          id?: string
          admin_id?: string
          action?: string
          target_id?: string
          target_type?: string
          details?: Json
          created_at?: string
        }
      }
    }
    Views: {
      user_permissions: {
        Row: {
          user_id: string
          role: string
          permissions: Json
        }
      }
    }
    Functions: {
      assign_role: {
        Args: {
          user_id: string
          new_role: string
          assigner_id: string
        }
        Returns: boolean
      }
      check_permission: {
        Args: {
          user_id: string
          resource: string
          action: string
        }
        Returns: boolean
      }
    }
  }
}