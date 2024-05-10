export const runtime = 'edge'

import Face2Meme from '@/components/ui/Face2Meme/Face2Meme'

import { createClient } from '@/utils/supabase/server';

export default async function Home() {
    const supabase = createClient();
  
    const {
      data: { user }
    } = await supabase.auth.getUser();
  
    return (
        <Face2Meme
        />
        
        );
  }
  