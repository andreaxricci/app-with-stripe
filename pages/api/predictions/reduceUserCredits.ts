import type { NextRequest, NextResponse } from 'next/server';
import { reduceUserCredits, reduceUserCreditsNew } from '@/utils/supabase/admin';

export const runtime = 'edge';

const handler = async (req: NextRequest) => {
  if (req.method === 'POST') {
    try {
      // Retrieve the user ID from the request headers or cookies
      const userId = req.headers.get('x-user-id');
      if (!userId) {
        return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
      }

      // Call the function to reduce user credits
      // await reduceUserCredits(userId);

      await reduceUserCreditsNew(userId);

      // Return a success response
      return new Response(JSON.stringify({ success: true }), { status: 200 });
    } catch (error) {
      console.error('Error reducing user credits:', error);
      return new Response(JSON.stringify({ error: 'Internal server error' }), { status: 500 });
    }
  } else {
    // Return a 405 Method Not Allowed if the request method is not POST
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), { status: 405 });
  }
};

export default handler;
