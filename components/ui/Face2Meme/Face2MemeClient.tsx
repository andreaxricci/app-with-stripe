"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import styles from "./Face2Meme.module.css"
import Button from "@/components/ui/Button"

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

interface Prediction {
  id: string;
  output: string;
  status: string;
  detail?: string;
}

export default function Face2MemeClient() {
  
  const [mounted, setMounted] = useState<boolean>(false)
  const [prediction, setPrediction] = useState<Prediction | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | undefined>();
  const [selectedSecondImage, setSelectedSecondImage] = useState<File | undefined>();
  const secondImageRef = useRef<HTMLDivElement | null>(null);

  // This function will be triggered when the file field change
  const imageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
      scrollToRef(secondImageRef);
    }
  };

  const secondImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedSecondImage(e.target.files[0]);
    }
  };

  // Scroll to ref function
  const scrollToRef = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // This function will be triggered when the "Remove This Image" button is clicked
  const removeSelectedImage = () => {
    setSelectedImage(undefined);
    setError(null);
  };

  const removeSelectedSecondImage = () => {
    setSelectedSecondImage(undefined);
    setError(null);
  };

  const handleDownload = () => {
    const imageUrl = prediction?.output[prediction.output.length - 1];
    if (imageUrl) {
    {/* saveAs(imageUrl, 'image.jpg'); */} 
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const reader1 = new FileReader();
    const reader2 = new FileReader();

    reader1.onload = async () => {
      const dataUrl1 = reader1.result as string;

      let dataUrl2;
      reader2.onload = () => {
          dataUrl2 = reader2.result as string;
          sendRequest(dataUrl1, dataUrl2);
        };
        reader2.readAsDataURL(selectedSecondImage as Blob);
      
    };

    reader1.readAsDataURL(selectedImage as Blob);
  };

  const sendRequest = async (dataUrl1: string, dataUrl2: string) => {
    console.log("Triggered!")
    const response = await fetch("/api/predictions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      },
    body: JSON.stringify({
      input_image: dataUrl1,
      target_image: dataUrl2
      }),
    });

    let prediction = await response.json() as Prediction;

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
      prediction = await response.json() as Prediction;

      if (response.status !== 200) {
        setError(prediction.detail ?? 'Unknown error occurred');
        return;
      }
      setPrediction(prediction);

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
      <div className="max-w-6xl px-4 py-8 mx-auto sm:py-24 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center"></div>
        <p className="text-4xl font-extrabold text-white sm:text-center sm:text-6xl">
          Hello World... Hello life
        </p>
      
        <form onSubmit={handleSubmit} >
        <div >
        <div className="grid grid-cols-1 gap-4">
        {!selectedImage && (
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
                <div >
                  <Button onClick={removeSelectedImage}>
                    Cancel
                  </Button>
                </div>            
              </div>
            )}
          

          {!selectedSecondImage && (
          <div className="flex items-center justify-center w-full">
          <label htmlFor="dropzone-file-2" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                  </svg>
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG or JPG (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file-2" type="file" className="hidden" 
                onChange={secondImageChange} />
          </label>
          </div>
          )}

          {selectedSecondImage && (
              <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
              <div className={styles.imageWrapper}>

                <img className={'${styles.img}'}
                  src={URL.createObjectURL(selectedSecondImage)}
                  alt="Thumb"
                />
                </div>
                <div >
                {!selectedImage && (
                  <Button onClick={removeSelectedSecondImage}>
                    Cancel
                  </Button>
                )}
                {selectedImage && (
                  <div className="grid grid-cols-2 gap-4">
                  <Button onClick={removeSelectedSecondImage}>
                    Cancel
                  </Button>
                  {prediction === null && ( 
                  <Button type="submit">Submit</Button>
                  )} 
                  {prediction !== null && ( 
                  <Button type="submit" disabled>Submit</Button>
                  )}
                </div>   
                )}
                </div>            
              </div>
            )}
        </div>
        </div>
        <div ref={secondImageRef}></div>
      </form>
      </div>

      {error && 

        <div className="md:container md:mx-auto px-4 w-full lg:w-1/3 flex flex-col gap-2 text-foreground mb-20">

            {error}

        </div>

        }

        {prediction && (
        <div className="md:container md:mx-auto px-4 w-full lg:w-1/3 flex flex-col gap-2 text-foreground mb-40">
          {prediction.status !== "succeeded" && (
            <p>status: {prediction.status}</p>
          )}
          
            {prediction.output && (
              <div className="mt-4 mb-4 flex flex-col items-center justify-center gap-4 overflow-hidden">
              <div >
                  <Image
                  fill
                  src={prediction.output}
                  alt="output"
                  sizes='100vw'
                />

              </div>
              <div className="grid grid-col gap-4">
                <Button  onClick={handleDownload}> Download</Button>
              </div> 
              </div>
            )}
            
        </div>
        )}

    </section>
  );
}
