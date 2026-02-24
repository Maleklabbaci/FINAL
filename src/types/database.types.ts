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
          username: string | null
          full_name: string | null
          avatar_url: string | null
          bio: string | null
          website: string | null
          category: string | null
          city: string | null
          skills: string[] | null
          whatsapp: string | null
          updated_at: string | null
          created_at: string
        }
        Insert: {
          id: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          category?: string | null
          city?: string | null
          skills?: string[] | null
          updated_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          username?: string | null
          full_name?: string | null
          avatar_url?: string | null
          bio?: string | null
          website?: string | null
          category?: string | null
          city?: string | null
          skills?: string[] | null
          updated_at?: string | null
          created_at?: string
        }
      }
      portfolios: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string | null
          slug: string
          theme: string | null
          is_published: boolean | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description?: string | null
          slug: string
          theme?: string | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string | null
          slug?: string
          theme?: string | null
          is_published?: boolean | null
          created_at?: string
          updated_at?: string
        }
      }
      projects: {
        Row: {
          id: string
          portfolio_id: string
          user_id: string
          title: string
          description: string | null
          image_url: string | null
          project_url: string | null
          category: string | null
          cover_url: string | null
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: string
          portfolio_id: string
          user_id: string
          title: string
          description?: string | null
          image_url?: string | null
          project_url?: string | null
          category?: string | null
          cover_url?: string | null
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          portfolio_id?: string
          user_id?: string
          title?: string
          description?: string | null
          image_url?: string | null
          project_url?: string | null
          category?: string | null
          cover_url?: string | null
          display_order?: number | null
          created_at?: string
        }
      }
    }
  }
}
