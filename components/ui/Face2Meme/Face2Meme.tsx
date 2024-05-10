import { createClient } from "@/utils/supabase/server"
import { redirect } from "next/navigation";
import Face2MemeClient from "./Face2MemeClient"

export async function getServerData() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
    return { error: "User not authenticated" };
  }

  return { user };
}

export default function Face2Meme() {
  return <Face2MemeClient />;
}

