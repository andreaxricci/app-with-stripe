export const runtime = 'edge'

import CustomerPortalForm from '@/components/ui/AccountForms/CustomerPortalForm';
import EmailForm from '@/components/ui/AccountForms/EmailForm';
import NameForm from '@/components/ui/AccountForms/NameForm';
import CreditsForm from '@/components/ui/AccountForms/CreditsForm';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import { getAvailableCredits } from '@/utils/supabase/admin';

export default async function Account() {
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  {/* 
  const { data: userDetails } = await supabase
    .from('users')
    .select('*')
    .single();

  const { data: subscription, error } = await supabase
    .from('subscriptions')
    .select('*, prices(*, products(*))')
    .in('status', ['trialing', 'active'])
    .maybeSingle(); 

  if (error) {
    console.log(error);
  }  */}

  if (!user) {
    return redirect('/signin');
  }

  let availableCredits = 0;

  try {
    availableCredits = await getAvailableCredits(user.id);
  } catch (error) {
    console.error('Error fetching available credits:', error);
  }

  return (
    <section className="mb-32 bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:px-6 sm:pt-24 lg:px-8">
        <div className="sm:align-center sm:flex sm:flex-col">
          <h1 className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
            Account
          </h1>
          <p className="max-w-2xl m-auto mt-5 text-xl text-zinc-200 sm:text-center sm:text-2xl">
            Available credits: {availableCredits}
          </p>
        </div>
      </div>
      <div className="p-4">
        {/* <CustomerPortalForm subscription={subscription} /> 
        <CreditsForm credits={userDetails?.credits ?? 0} />
        <NameForm userName={userDetails?.full_name ?? ''} /> */}
        <EmailForm userEmail={user.email} />
      </div>
    </section>
  );
}
