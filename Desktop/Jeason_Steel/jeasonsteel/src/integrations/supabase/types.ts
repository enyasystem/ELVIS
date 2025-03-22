export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      bank_accounts: {
        Row: {
          account_name: string
          account_number: string
          bank_name: string
          created_at: string
          id: string
          is_active: boolean | null
          updated_at: string
        }
        Insert: {
          account_name: string
          account_number: string
          bank_name: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Update: {
          account_name?: string
          account_number?: string
          bank_name?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          updated_at?: string
        }
        Relationships: []
      }
      bookings: {
        Row: {
          celebrity_id: string | null
          created_at: string
          duration: number
          id: string
          meeting_date: string
          notes: string | null
          status: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          celebrity_id?: string | null
          created_at?: string
          duration?: number
          id?: string
          meeting_date: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          celebrity_id?: string | null
          created_at?: string
          duration?: number
          id?: string
          meeting_date?: string
          notes?: string | null
          status?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "bookings_celebrity_id_fkey"
            columns: ["celebrity_id"]
            isOneToOne: false
            referencedRelation: "celebrities"
            referencedColumns: ["id"]
          },
        ]
      }
      career_applications: {
        Row: {
          created_at: string | null
          email: string
          experience: string
          id: number
          name: string
          phone: string
          position: string
          resume_url: string | null
          status: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          experience: string
          id?: number
          name: string
          phone: string
          position: string
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          experience?: string
          id?: number
          name?: string
          phone?: string
          position?: string
          resume_url?: string | null
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      careers: {
        Row: {
          created_at: string
          department: string
          description: string
          id: number
          location: string
          title: string
          type: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department: string
          description: string
          id?: number
          location: string
          title: string
          type: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          description?: string
          id?: number
          location?: string
          title?: string
          type?: string
          updated_at?: string
        }
        Relationships: []
      }
      celebrities: {
        Row: {
          biography: string | null
          created_at: string
          gallery: Json | null
          id: string
          name: string
          profile_image: string | null
          social_media: Json | null
          updated_at: string
        }
        Insert: {
          biography?: string | null
          created_at?: string
          gallery?: Json | null
          id?: string
          name: string
          profile_image?: string | null
          social_media?: Json | null
          updated_at?: string
        }
        Update: {
          biography?: string | null
          created_at?: string
          gallery?: Json | null
          id?: string
          name?: string
          profile_image?: string | null
          social_media?: Json | null
          updated_at?: string
        }
        Relationships: []
      }
      celebrity_events: {
        Row: {
          celebrity_id: string | null
          created_at: string
          description: string | null
          event_date: string
          id: string
          image: string | null
          location: string | null
          title: string
        }
        Insert: {
          celebrity_id?: string | null
          created_at?: string
          description?: string | null
          event_date: string
          id?: string
          image?: string | null
          location?: string | null
          title: string
        }
        Update: {
          celebrity_id?: string | null
          created_at?: string
          description?: string | null
          event_date?: string
          id?: string
          image?: string | null
          location?: string | null
          title?: string
        }
        Relationships: [
          {
            foreignKeyName: "celebrity_events_celebrity_id_fkey"
            columns: ["celebrity_id"]
            isOneToOne: false
            referencedRelation: "celebrities"
            referencedColumns: ["id"]
          },
        ]
      }
      comments: {
        Row: {
          content: string
          created_at: string | null
          discussion_id: string | null
          id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          discussion_id?: string | null
          id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          created_at: string | null
          description: string
          id: string
          title: string
          total_lessons: number
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          description: string
          id?: string
          title: string
          total_lessons?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string
          id?: string
          title?: string
          total_lessons?: number
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      discussions: {
        Row: {
          content: string
          created_at: string | null
          group_id: string | null
          id: string
          title: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          title: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          group_id?: string | null
          id?: string
          title?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "discussions_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      group_members: {
        Row: {
          group_id: string
          joined_at: string | null
          role: string | null
          user_id: string
        }
        Insert: {
          group_id: string
          joined_at?: string | null
          role?: string | null
          user_id: string
        }
        Update: {
          group_id?: string
          joined_at?: string | null
          role?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "group_members_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "study_groups"
            referencedColumns: ["id"]
          },
        ]
      }
      jobs: {
        Row: {
          company: string
          created_at: string
          description: string
          experience_level: string | null
          id: string
          job_type: string
          location: string
          salary_max: number | null
          salary_min: number | null
          title: string
          updated_at: string
          user_id: string | null
        }
        Insert: {
          company: string
          created_at?: string
          description: string
          experience_level?: string | null
          id?: string
          job_type: string
          location: string
          salary_max?: number | null
          salary_min?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          company?: string
          created_at?: string
          description?: string
          experience_level?: string | null
          id?: string
          job_type?: string
          location?: string
          salary_max?: number | null
          salary_min?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          content: string
          course_id: string
          created_at: string | null
          id: string
          order_number: number
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          course_id: string
          created_at?: string | null
          id?: string
          order_number: number
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          course_id?: string
          created_at?: string | null
          id?: string
          order_number?: number
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "lessons_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      listings: {
        Row: {
          category: string
          created_at: string
          description: string | null
          email: string | null
          id: string
          image_url: string | null
          location: string
          phone: string | null
          price: number | null
          rating: number | null
          title: string
          updated_at: string
          user_id: string | null
          website: string | null
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          location: string
          phone?: string | null
          price?: number | null
          rating?: number | null
          title: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          email?: string | null
          id?: string
          image_url?: string | null
          location?: string
          phone?: string | null
          price?: number | null
          rating?: number | null
          title?: string
          updated_at?: string
          user_id?: string | null
          website?: string | null
        }
        Relationships: []
      }
      posts: {
        Row: {
          content: string
          created_at: string
          excerpt: string | null
          id: string
          published: boolean | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          excerpt?: string | null
          id?: string
          published?: boolean | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          category: string
          created_at: string
          description: string
          full_description: string
          id: number
          image: string
          images: Json
          price: number
          specifications: Json
          title: string
          updated_at: string
        }
        Insert: {
          category: string
          created_at?: string
          description: string
          full_description: string
          id?: number
          image: string
          images?: Json
          price: number
          specifications?: Json
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          full_description?: string
          id?: number
          image?: string
          images?: Json
          price?: number
          specifications?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          achievements: Json | null
          avatar_url: string | null
          badges: Json | null
          bio: string | null
          booking_history: Json | null
          created_at: string
          email: string | null
          favorites: Json | null
          full_name: string | null
          id: string
          last_activity_date: string | null
          points: number | null
          progress: Json | null
          role: string | null
          streak_days: number | null
          updated_at: string | null
          username: string | null
        }
        Insert: {
          achievements?: Json | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_history?: Json | null
          created_at?: string
          email?: string | null
          favorites?: Json | null
          full_name?: string | null
          id: string
          last_activity_date?: string | null
          points?: number | null
          progress?: Json | null
          role?: string | null
          streak_days?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          achievements?: Json | null
          avatar_url?: string | null
          badges?: Json | null
          bio?: string | null
          booking_history?: Json | null
          created_at?: string
          email?: string | null
          favorites?: Json | null
          full_name?: string | null
          id?: string
          last_activity_date?: string | null
          points?: number | null
          progress?: Json | null
          role?: string | null
          streak_days?: number | null
          updated_at?: string | null
          username?: string | null
        }
        Relationships: []
      }
      quiz_attempts: {
        Row: {
          created_at: string | null
          id: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_correct: boolean
          question_id: string
          selected_answer: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          id?: string
          is_correct?: boolean
          question_id?: string
          selected_answer?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "quiz_attempts_question_id_fkey"
            columns: ["question_id"]
            isOneToOne: false
            referencedRelation: "quiz_questions"
            referencedColumns: ["id"]
          },
        ]
      }
      quiz_questions: {
        Row: {
          correct_answer: string
          created_at: string | null
          explanation: string | null
          id: string
          lesson_id: string
          options: Json
          question: string
          updated_at: string | null
        }
        Insert: {
          correct_answer: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          lesson_id: string
          options: Json
          question: string
          updated_at?: string | null
        }
        Update: {
          correct_answer?: string
          created_at?: string | null
          explanation?: string | null
          id?: string
          lesson_id?: string
          options?: Json
          question?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "quiz_questions_lesson_id_fkey"
            columns: ["lesson_id"]
            isOneToOne: false
            referencedRelation: "lessons"
            referencedColumns: ["id"]
          },
        ]
      }
      quote_requests: {
        Row: {
          company: string
          created_at: string | null
          email: string
          id: number
          name: string
          phone: string
          product_details: string
          quantity: string
          status: string
          updated_at: string | null
        }
        Insert: {
          company: string
          created_at?: string | null
          email: string
          id?: number
          name: string
          phone: string
          product_details: string
          quantity: string
          status?: string
          updated_at?: string | null
        }
        Update: {
          company?: string
          created_at?: string | null
          email?: string
          id?: number
          name?: string
          phone?: string
          product_details?: string
          quantity?: string
          status?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      reviews: {
        Row: {
          comment: string | null
          created_at: string
          id: string
          listing_id: string | null
          rating: number | null
          user_id: string | null
        }
        Insert: {
          comment?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Update: {
          comment?: string | null
          created_at?: string
          id?: string
          listing_id?: string | null
          rating?: number | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "reviews_listing_id_fkey"
            columns: ["listing_id"]
            isOneToOne: false
            referencedRelation: "listings"
            referencedColumns: ["id"]
          },
        ]
      }
      stories: {
        Row: {
          content: string
          created_at: string
          genre: string
          id: string
          rating: number | null
          reward: number | null
          status: string
          title: string
          updated_at: string
          user_id: string
          word_count: number
        }
        Insert: {
          content: string
          created_at?: string
          genre: string
          id?: string
          rating?: number | null
          reward?: number | null
          status?: string
          title: string
          updated_at?: string
          user_id: string
          word_count?: number
        }
        Update: {
          content?: string
          created_at?: string
          genre?: string
          id?: string
          rating?: number | null
          reward?: number | null
          status?: string
          title?: string
          updated_at?: string
          user_id?: string
          word_count?: number
        }
        Relationships: []
      }
      study_groups: {
        Row: {
          created_at: string | null
          created_by: string | null
          description: string | null
          id: string
          name: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          description?: string | null
          id?: string
          name?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      transactions: {
        Row: {
          admin_verified: boolean | null
          admin_verified_at: string | null
          admin_verified_by: string | null
          amount: number
          bank_transfer_reference: string | null
          created_at: string
          currency: string | null
          customer_email: string | null
          customer_name: string | null
          customer_phone: string | null
          flutterwave_reference: string | null
          id: string
          payment_method: string
          payment_proof_url: string | null
          payment_status: string | null
          updated_at: string
          user_id: string | null
        }
        Insert: {
          admin_verified?: boolean | null
          admin_verified_at?: string | null
          admin_verified_by?: string | null
          amount: number
          bank_transfer_reference?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          flutterwave_reference?: string | null
          id?: string
          payment_method: string
          payment_proof_url?: string | null
          payment_status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          admin_verified?: boolean | null
          admin_verified_at?: string | null
          admin_verified_by?: string | null
          amount?: number
          bank_transfer_reference?: string | null
          created_at?: string
          currency?: string | null
          customer_email?: string | null
          customer_name?: string | null
          customer_phone?: string | null
          flutterwave_reference?: string | null
          id?: string
          payment_method?: string
          payment_proof_url?: string | null
          payment_status?: string | null
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_accounts: {
        Row: {
          balance: number
          created_at: string
          id: string
          total_earned: number
          updated_at: string
        }
        Insert: {
          balance?: number
          created_at?: string
          id: string
          total_earned?: number
          updated_at?: string
        }
        Update: {
          balance?: number
          created_at?: string
          id?: string
          total_earned?: number
          updated_at?: string
        }
        Relationships: []
      }
      user_course_progress: {
        Row: {
          completed_lessons: number | null
          course_id: string
          created_at: string | null
          id: string
          last_accessed: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          completed_lessons?: number | null
          course_id: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          completed_lessons?: number | null
          course_id?: string
          created_at?: string | null
          id?: string
          last_accessed?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_course_progress_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      leaderboard: {
        Row: {
          avatar_url: string | null
          id: string | null
          points: number | null
          rank: number | null
          streak_days: number | null
          username: string | null
        }
        Relationships: []
      }
    }
    Functions: {
      add_story_reward: {
        Args: {
          user_id: string
          reward_amount: number
        }
        Returns: undefined
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
