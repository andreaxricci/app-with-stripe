import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Face2MemeClient from "./Face2MemeClient"
import { getAvailableCredits } from '@/utils/supabase/admin';

export default async function Face2Meme() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  let availableCredits = 0;

  try {
    availableCredits = await getAvailableCredits(user.id);
  } catch (error) {
    console.error('Error fetching available credits:', error);
  }

  {/* 
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single(); 
  */}

  return <Face2MemeClient user={user} credits={availableCredits ?? 0} />;
}

