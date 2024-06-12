"use client";

import { useState, useEffect, useRef } from "react";
import { saveAs } from 'file-saver'; 
import Link from 'next/link';
import styles from "./MainPage.module.css"
import Button from "@/components/ui/Button"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Prediction {
  id: string;
  output: any;
  status: string;
  error: string;
  detail?: any;
}

interface MainPageClientProps {
  user?: any;
  credits?: number;
}

export default function MainPageClient({ user, credits }: MainPageClientProps) {
  
  const [mounted, setMounted] = useState<boolean>(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [text, setText] = useState('');
  const predictionRef = useRef<HTMLDivElement | null>(null);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [useImage, setUseImage] = useState<boolean>(true);


  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      scrollToRef(predictionRef);
    }
  };

  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const removeSelectedImage = () => {
    setSelectedImage(undefined);
    setSubmitted(false);
    setError(null);
  };

  const resetPrediction = () => {
    setSelectedImage(undefined);
    setPrediction(null);
    setError(null);
    setSubmitted(false);
  };

  const handleDownload = () => {
    const imageUrl = prediction?.output;
    if (imageUrl) {
      fetch(imageUrl)
        .then(response => response.blob())
        .then(blob => {
          const url = URL.createObjectURL(blob);
          saveAs(url, 'image.jpg');
          URL.revokeObjectURL(url); // Clean up after the download
        })
        .catch(error => {
          console.error('Error downloading the image:', error);
        });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    const input_prompt = text; 

    if (useImage && selectedImage) {
      const reader1 = new FileReader();
      reader1.onload = async () => {
        const dataUrl1 = reader1.result as string;
        sendRequest(dataUrl1, input_prompt, user);
      };
      reader1.readAsDataURL(selectedImage);
    } else {
      sendRequest(undefined, input_prompt, user);
    }
};

  const sendRequest = async (dataUrl1: string | undefined, input_prompt: string, user: any) => {
    console.log("Triggered!")
    const response = await fetch("/api/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      
      input_image: dataUrl1,
      input_prompt: input_prompt,
      user: user
    }),
  });

  let prediction = await response.json();

  if (response.status !== 201) {
    setError(prediction.detail ?? 'Unknown error occurred');
    return;
  }

  setPrediction(prediction);

  while (
    prediction.status !== "succeeded" &&
    prediction.status !== "failed"
  ) {
    await sleep(100);
    const response = await fetch("/api/predictions/" + prediction.id);
    prediction = await response.json();

    if (response.status !== 200) {
      setError(prediction.detail ?? 'Unknown error occurred');
      return;
    }
    setPrediction(prediction);
  }

  if (prediction.status === "succeeded" && prediction.output === undefined) {
    const errorMessage = prediction.logs 
      ? `Error: please try a different image. Details: ${prediction.logs}`
      : 'Error: please try using a different image';
      
    setError(errorMessage);
    setPrediction(null)
    return;
  }

  if (prediction.status === "succeeded") {
    try {
      const creditsResponse = await fetch("/api/predictions/reduceUserCredits", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-id": user.id
        },
        body: JSON.stringify({
          user: user,
        }),
      });

      if (!creditsResponse.ok) {
        throw new Error('Failed to reduce user credits');
      }

      const creditsData = await creditsResponse.json();

      if (creditsData.error) {
        throw new Error(creditsData.error);
      }

      console.log('User credits reduced successfully:', creditsData);
    } catch (error) {
      console.error('Error reducing user credits:', error);
    }
  }
};

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
    }, [])
    
  if (!mounted) {
    return null
  }

  return (
    <section className="bg-black">
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center"></div>
        <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Generate a new {' '}
            <a
              className="text-yellow-500"
            >
              Image
            </a>
        </p>
      
        <form onSubmit={handleSubmit} >
          <div >
            <div className="md:container md:mx-auto px-4 w-full lg:w-1/2 flex flex-col gap-2 text-foreground mb-4">
              <div className="mt-8">
                <div className="mt-8">
                  <div className="mb-4 w-full">
                    <textarea
                      className="flex min-h-[60px] w-full  rounded-md border border-input bg-transparent px-3 py-2 text-sm shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                      id="image_input_text"
                      name="image_input_text"
                      placeholder="Add prompt here..."
                      value={text} 
                      onChange={(e) => setText(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-center mb-4">
                  <label htmlFor="useImageSwitch" className="mr-2 text-white">Use reference image:</label>
                  <label className="switch">
                    <input
                      type="checkbox"
                      id="useImageSwitch"
                      checked={useImage}
                      onChange={() => setUseImage(!useImage)}
                    />
                    <span className="slider round"></span>
                  </label>
                  <span className="ml-2 text-white">{useImage ? "Yes" : "No"}</span>
                </div>
              </div>
              {!selectedImage && useImage && (
                <div className="flex items-center justify-center w-full">
                  <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                      </svg>
                      <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" className="hidden" 
                      onChange={imageChange} />
                  </label>
                </div>
                )}

              {selectedImage && (
                <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
                  <div className={styles.imageWrapper}>
                    <img className={'${styles.img}'}
                      src={URL.createObjectURL(selectedImage)}
                      alt="Thumb"
                    />
                  </div>
                  
                  {!prediction && (
                  <div >
                    <Button onClick={removeSelectedImage}>
                      Cancel
                    </Button>
                  </div>     
                  )}       
                </div>
                )}

              {1===1 && (
                <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden">

                  <div >

                    {( selectedImage || !useImage ) && !prediction && (

                      <div >

                      {user && (credits ?? 0) > 0 && prediction === null && !submitted && text && (
                        <Button type="submit">Submit</Button>
                      )}

                      {!user && (
                        <Link href="/signin">
                          <Button>Sign In</Button>
                        </Link>
                      )}

                      {user && (credits ?? 0) < 1 && prediction === null && text && (
                        <Link href="/pricing">
                          <Button>Buy credits</Button>
                        </Link>
                      )}

                      {user && submitted && ( 
                      <Button type="submit" disabled>Submit</Button>
                      )}
                    </div>   
                  )}
                  </div>
      
                  </div>
                )} 
                </div>
          </div>
        </form>
      
      </div>

      <div ref={predictionRef}></div>

      {error && 

        <div className="md:container md:mx-auto px-4 w-full lg:w-1/3 flex flex-col gap-2 text-foreground mb-20">

            {error}

        </div>

        }

        {prediction && (
        <div className="max-w-6xl px-4 mb-2 mx-auto sm:py-4 sm:px-6 lg:px-8">
          
            <div className="md:container md:mx-auto px-4 w-full lg:w-1/2 flex flex-col gap-2 text-foreground mb-4">
              <div>
                <p className="text-xl font-bold text-white sm:text-xl">
                  Your new image
                </p>
            </div>
              {prediction.status !== "succeeded" && (
                <div>
                  <p>status: {prediction.status}</p>
                  <p>{prediction.error}</p>
                  <div className="mt-4">
                    <Link href="/generateimage">
                      <Button onClick={resetPrediction}>Start again</Button>
                    </Link>
                  </div>
                </div>
              )}
              {prediction.status === "succeeded" && prediction.output === null && (
                <div>
                  <p>Error: try using another image </p>
                </div>
              )}
              {prediction.output && (
                
                <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
                  
                  <div className={styles.imageWrapper}>
                    <img className={'${styles.img}'}
                      src={prediction.output}
                      alt="out"
                    />
                  </div> 

                  
                  <div className="grid grid-cols-2 gap-4">
                    <Button onClick={handleDownload}> Download</Button>
                    <Link href="/generateimage">
                      <Button onClick={resetPrediction}>Start again</Button>
                    </Link>
                  </div>

                </div>
              )}
            </div>    
        </div>
        )}

    </section>
  );
}
