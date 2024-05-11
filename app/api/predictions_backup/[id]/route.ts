import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET(req: NextRequest): Promise<NextResponse> {
    // Handle GET request
    return new NextResponse('Method Not Allowed', { status: 405 });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
    if (req.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');

        const res = await fetch(
            "https://api.replicate.com/v1/predictions/" + id,
            {
                headers: {
                    Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        if (res.status !== 200) {
          const error = await res.json();
          console.error(error.detail);
          return new NextResponse(JSON.stringify({ detail: error.detail }), { status: res.status });
        }

        const prediction = await res.json();

        // Return a Next.js response with the JSON data
        return new NextResponse(JSON.stringify(prediction), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse(JSON.stringify({ detail: "Internal Server Error" }), { status: 500 });
    }
}
