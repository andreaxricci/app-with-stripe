import { reduceUserCredits } from '@/utils/supabase/admin'; // Import the function to reduce user credits

export const runtime = 'edge';

export default async function handler(req: { method: string; headers: { [x: string]: any; }; }, res: { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { error?: string; credits?: number; }): void; new(): any; }; }; }) {
  if (req.method === 'POST') {
    try {
      // Retrieve the user ID from the request headers or cookies
      const userId = req.headers['x-user-id']; // Example: if you're using 'x-user-id' header
      console.log(`breakpoint api 3 ${userId}`)
      if (!userId) {
        return res.status(401).json({ error: 'Unauthorized' });
      }

      // Call the function to reduce user credits
      const newCredits = await reduceUserCredits(userId);

      // Return the updated credits to the client
      res.status(200).json({ credits: newCredits });
    } catch (error) {
      console.error('Error reducing user credits:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
  } else {
    // Return a 405 Method Not Allowed if the request method is not POST
    res.status(405).json({ error: 'Method Not Allowed' });
  }
}
