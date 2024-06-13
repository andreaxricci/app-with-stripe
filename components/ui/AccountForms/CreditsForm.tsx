'use client';

import Card from '@/components/ui/Card';

export default function CreditsForm({ credits }: { credits: number }) {

  return (
    <Card
      title="Your available credits"
    >
      <div className="mt-8 mb-4 text-xl font-semibold">
      {credits}
        
      </div>
    </Card>
  );
}
