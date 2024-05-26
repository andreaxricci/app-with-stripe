import { createClient } from "@/utils/supabase/server"
import Face2MemeClient from "./Face2MemeClient"
import { getAvailableCredits } from '@/utils/supabase/admin';

export default async function Face2Meme() {

  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let availableCredits = 0;

  if (user) {
    try {
      availableCredits = await getAvailableCredits(user.id);
    } catch (error) {
      console.error('Error fetching available credits:', error);
    }
  }

  return <Face2MemeClient user={user} credits={availableCredits ?? 0} />;
}

