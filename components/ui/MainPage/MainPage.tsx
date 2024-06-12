import { createClient } from "@/utils/supabase/server"
import MainPageClient from "./MainPageClient"
import { getAvailableCredits } from '@/utils/supabase/admin';

export default async function MainPage() {

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

  return <MainPageClient user={user} credits={availableCredits ?? 0} />;
}

