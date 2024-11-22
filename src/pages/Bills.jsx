import React from 'react'
import image from '../assets/bill.png';

const Bills = () => {
  return (
    <>
    <div className='mt-4'>
    <form>
  <label htmlFor="imageUpload" className='font-bold'>Upload an Image:</label>
  <input type="file" id="imageUpload" accept="image/*" className='pl-4' />
 </form>
 <img src={image} alt="Description of image" className='mt-4' />

 </div>
    </>
  )
}

export default Bills
