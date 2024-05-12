import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Face2MemeClient from "./Face2MemeClient"

export default async function Face2Meme() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect('/signin');
  }

  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  return <Face2MemeClient user={user} credits={userDetails?.credits ?? 0} />;
}

