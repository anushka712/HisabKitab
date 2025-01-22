import React from 'react'

const Contact = () => {
  return (
    <div className="h-[700px] ml-44">
  <div className="flex flex-col md:flex-row items-center justify-between h-[75%]">
     
  <div className="flex flex-col justify-center items-center pt-24 pb-24 lg:ml-10 shadow-md">
   <h2 className="py-4 text-2xl text-gray-400 font-bold">Message Us...</h2>
   <div className="p-8">
<form >
      <label htmlFor="name">Name</label>
      <br />
      <input
        type="text"
        name="name"
        placeholder="Your name..."
        required
        className="border border-gray-400 p-1 mt-2 lg:w-96 rounded-md"
      
      />
      <br />
      <br />

      <label htmlFor="email">Email</label>
      <br />
      <input
        type="email"
        name="email"
        required
        className="border border-gray-400 p-1 mt-2 lg:w-96 rounded-md"
        placeholder="Your email..."
       
      />
      <br />
      <br />

      <label htmlFor="message">Message</label>
      <br />
      <input
        type="text"
        name="message"
        placeholder="Message"
        className="border border-gray-400 p-1 mt-2 lg:w-96 rounded-md"
        
      />
      <br />

      <input
        type="submit"
        value="Submit"
        className="border border-gray-400 p-1 px-2 mt-4 cursor-pointer rounded-md"
      />
    </form>



    </div>
    </div>

    <div className='ml-10'>
      <img src="/contact.png" alt="" className="w-1/2 h-13 " />
    </div>

  </div>
</div>

  )
}

export default Contact
