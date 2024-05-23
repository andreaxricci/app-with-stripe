export const runtime = 'edge'

import { LandingPrimaryImageCtaSection } from '@/components/ui/Landing/Landing'
import { createClient } from '@/utils/supabase/server';
import Button from '@/components/ui/Button/Button';
import Link from 'next/link';
import { getAvailableCredits } from '@/utils/supabase/admin';
import { redirect } from 'next/navigation';

export default async function Home() {
  
  const supabase = createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser(); 

  if (!user) {
    return redirect('/signin');
  }

  {/* 

  const { data: userDetails, error } = await supabase
    .from('users')
    .select('*')
    .single(); 

  if (error) {
    console.log(error);
  }

  */}

  let availableCredits = 0;

  try {
    availableCredits = await getAvailableCredits(user.id);
  } catch (error) {
    console.error('Error fetching available credits:', error);
  }

  {/* 

  const credits = userDetails?.credits ?? 0 

  const { data: products } = await supabase
    .from('products')
    .select('*, prices(*)')
    .eq('active', true)
    .eq('prices.active', true)
    .order('metadata->index')
    .order('unit_amount', { referencedTable: 'prices' }); */} 


    {/* return (
        <Homepage/>
    ); 
  */}

  return (
      
    <LandingPrimaryImageCtaSection
      title="Personalize your memes"
      description="Pick a photo of yours and your favourite memes and we'll generate for you a personalized version, that you can share with your friends!"
      imageSrc="/DjangoMeme.jpeg"
      imageAlt="Sample image"
      imageShadow = 'soft'
      withBackground
    >
    { availableCredits < 1 &&
      <div>
      <Link href="/pricing">
        <Button>Create your meme</Button>
      </Link>
      </div>
    }
    { availableCredits > 0 &&
      <div className='flex justify-center items-center'>
      <Link href="/face2meme">
        <Button>Create your meme</Button>
      </Link>
      </div>
    }

    </LandingPrimaryImageCtaSection> 
      
      );
}
