import type { NextRequest } from 'next/server';

export const runtime = 'edge';

const handler = async (req: NextRequest): Promise<Response> => {
    
    if (req.method !== 'POST') {
      return new Response('Method Not Allowed', { status: 405 });
    }

    const { input_image, input_prompt, user } = await req.json();

    const res = await fetch("https://api.replicate.com/v1/predictions", {
    headers: {
        Authorization: `Bearer ${process.env.REPLICATE_API_TOKEN}`,
        "Content-Type": "application/json",
        },
    method: 'POST',
    body: JSON.stringify({
        // Pinned to a specific version of Stable Diffusion
        // See https://replicate.com/stability-ai/sdxl
        version: "f71e6abfc606137e777d505cbb2d166de45fc5cfcc847a1d07e97af63a03748d",
    
        // This is the text prompt that will be submitted by a form on the frontend
        input: { 
            width: 1156,
            height: 768,
            prompt: input_prompt,
            negative_prompt: "hands, pastels, spots, photo, text, watermark",
            image: input_image
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