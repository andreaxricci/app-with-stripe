import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest): Promise<NextResponse> {
    if (req.method !== 'POST') {
        return new NextResponse('Method Not Allowed', { status: 405 });
    }

    try {
        const { input_image, target_image } = await req.json();

        const res = await fetch("https://api.replicate.com/v1/predictions", {
            headers: {
                Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
                "Content-Type": "application/json",
            },
            method: 'POST',
            body: JSON.stringify({
                version: "c2d783366e8d32e6e82c40682fab6b4c23b9c6eff2692c0cf7585fc16c238cfe",
                input: {
                    swap_image: input_image,
                    target_image: target_image
                },
            }),
        });

        if (!res.ok) {
            const error = await res.json();
            console.error(error.detail);
            return new NextResponse(JSON.stringify({ detail: error.detail }), { status: res.status });
        }

        const prediction = await res.json();

        // Return a Next.js response with the JSON data
        return new NextResponse(JSON.stringify(prediction), {
            status: 201,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error("Error processing request:", error);
        return new NextResponse(JSON.stringify({ detail: "Internal Server Error" }), { status: 500 });
    }
}
