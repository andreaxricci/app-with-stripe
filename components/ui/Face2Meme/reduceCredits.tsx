import { reduceUserCredits } from '@/utils/supabase/admin'

export const runtime = 'edge';

export default async function reduceCredits(user: string) {
    
    reduceUserCredits(user)

  }
  