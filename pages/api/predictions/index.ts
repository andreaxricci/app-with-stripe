import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const handler = async (req: NextRequest): Promise<Response> => {
    console.log("breakpoint 0")
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { input_image, target_image, user } = await req.json();

    const res = await fetch("https://api.replicate.com/v1/predictions", {
    headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        },
    method: 'POST',
    body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/sdxl
        version: "c2d783366e8d32e6e82c40682fab6b4c23b9c6eff2692c0cf7585fc16c238cfe",
    
        // This is the text prompt that will be submitted by a form on the frontend
        input: { 
            swap_image: input_image,
            target_image: target_image
        },
        }),
    });

    if (res.status !== 201) {
    const error = await res.json();
    return new Response(JSON.stringify({ detail: error.detail }), { status: 500 });
    }

    const prediction = await res.json();
    // console.log("INDEX")
    // console.log(JSON.stringify(prediction))

    {/* await reduceUserCredits(user) */}

    return new Response(JSON.stringify(prediction), {
        status: 201,
    });

};
 
export default handler;