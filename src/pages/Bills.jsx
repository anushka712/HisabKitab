import React, { useCallback, useEffect, useState } from 'react'
import { createWorker } from 'tesseract.js';
import image from '../assets/bill.png';


const Bills = () => {
 
  const [selectedImage , setSelectedImage] = useState(null);
  const [textResult, setTextResult] = useState("")
 const [loading, setLoading] = useState(false)

  const worker = createWorker();

  const convertImageToText = useCallback(async() =>{
    if(!selectedImage) return;
    setLoading(true);
    await worker.load();
    await worker.loadLanguage("eng");
    await worker.initialize("eng");

    const {data} = await worker.recognize(selectedImage);
    
    setTextResult(data.text);
    setLoading(false)
  }, [selectedImage] )

  useEffect(() => {
    convertImageToText();
  }, [selectedImage, convertImageToText])

//Refresh the page everytime selectedImage and convertImageToText changes and in every change the convertImageTOText funcition will run.

  const handleChangeImage = e =>{
    if(e.target.files[0]){
      setSelectedImage(e.target.files[0]);
    }else{
      setSelectedImage(null);
      setTextResult("")
    }
  }

  const handleTextChange = (e) => {
    setTextResult(e.target.value)
  }

  return (
    <>
    <div className='mt-4'>

    <div className="relative">
  <label
    htmlFor="imageUpload"
    className="absolute top-0 left-[-12px] bg-blue-500 text-white font-bold  px-2 py-2 rounded cursor-pointer z-10">
    Upload an Image
  </label>
  <input
    type="file"
    id="imageUpload"
    accept="image/*"
    className="pl-8 relative z-0 mt-1 font-bold"
    onChange={handleChangeImage}
  />
</div>

<div className='mt-4'>
  {selectedImage && (
    <div>
      <img src={URL.createObjectURL(selectedImage)} alt="bill"  className='w-full md:w-1/2'/>
    </div>
  )}

{loading ? (
          <div className="flex justify-center items-center mt-12">
            <div className="w-16 h-16 border-4 border-t-blue-500 border-solid rounded-full animate-spin"></div>
          </div>
        ) : (
          textResult && (
            <div className='mt-12'>
              <textarea 
              value={textResult}
              onChange={handleTextChange}
              className='w-full h-60 p-2 border rounded-lg'
              ></textarea>
            </div>
          )
        )}
  
</div>

 <img src={image} alt="Description of image" className='mt-4' />

 </div>
    </>
  )
}

export default Bills
