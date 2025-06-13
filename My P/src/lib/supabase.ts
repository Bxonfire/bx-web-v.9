import { createClient } from '@supabase/supabase-js';

// Pre-configured Supabase credentials (working and tested)
const supabaseUrl = 'https://vbxcxjbjvovlkuiyphhf.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZieGN4amJqdm92bGt1aXlwaGhmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3MzI5ODUsImV4cCI6MjA2NTMwODk4NX0.FLA5DCsu8zbV5R3EPE7fa3aieijDKNwMrWXK1oQ82YY';

// Create client with working credentials
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database functions
export const saveContentToDatabase = async (content: any) => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .upsert({ 
        id: 1, 
        content: content,
        updated_at: new Date().toISOString()
      });
    
    if (error) {
      console.error('❌ Error saving to database:', error);
      return false;
    }
    
    console.log('✅ Content saved to database successfully');
    return true;
  } catch (error) {
    console.error('❌ Database save error:', error);
    return false;
  }
};

export const loadContentFromDatabase = async () => {
  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('content')
      .eq('id', 1)
      .single();
    
    if (error) {
      console.error('❌ Error loading from database:', error);
      return null;
    }
    
    return data?.content || null;
  } catch (error) {
    console.error('❌ Database load error:', error);
    return null;
  }
};

// Real-time subscription for content changes
export const subscribeToContentChanges = (callback: (content: any) => void) => {
  return supabase
    .channel('site_content_changes')
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'site_content'
      },
      (payload) => {
        if (payload.new && payload.new.content) {
          callback(payload.new.content);
        }
      }
    )
    .subscribe();
};