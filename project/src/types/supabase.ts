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
          website: string
          bio: string
        }
        Insert: {
          id: string
          created_at?: string
          updated_at?: string
          username: string
          full_name?: string
          avatar_url?: string
          website?: string
          bio?: string
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          username?: string
          full_name?: string
          avatar_url?: string
          website?: string
          bio?: string
        }
      }
      posts: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          content: string
          author_id: string
          media_urls: string[]
          reactions: Json
          comments_count: number
          shares_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          content: string
          author_id: string
          media_urls?: string[]
          reactions?: Json
          comments_count?: number
          shares_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          content?: string
          author_id?: string
          media_urls?: string[]
          reactions?: Json
          comments_count?: number
          shares_count?: number
        }
      }
      comments: {
        Row: {
          id: string
          created_at: string
          updated_at: string
          content: string
          author_id: string
          post_id: string
          parent_id: string | null
          reactions: Json
        }
        Insert: {
          id?: string
          created_at?: string
          updated_at?: string
          content: string
          author_id: string
          post_id: string
          parent_id?: string | null
          reactions?: Json
        }
        Update: {
          id?: string
          created_at?: string
          updated_at?: string
          content?: string
          author_id?: string
          post_id?: string
          parent_id?: string | null
          reactions?: Json
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}