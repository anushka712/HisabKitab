import React from 'react'

const Featured = () => {
  return (
    <div className='mx-[10%] sm:mt-24 flex flex-col md:flex-row justify-center items-center gap-10 pb-10'>

      <div className='ml-4 rounded-lg  w-1/2'>
      <img src="/cover.jpg" alt="" className="w-full h-full " />
    </div>

    <div>
        <h2 className='font-bold text-3xl text-center pb-2'>What Can You Do With HisabKitab?</h2>
        <p>Karobar app is built for Nepali businesses to help them manage their accounting from mobile. Here are some of the features which you can make use of:</p>
        <div>
        Maintain Stocks 
Record Sales & Purchases 
Quick Billing 
View 15+ Reports
Import Data From Excel
Enable App Lock<br />
Manage Parties<br />
Send Invoices<br />
Business Stats<br />
Record Income Expenses<br />
Use in Nepali Language<br />
Customize Theme<br />
        </div>
    </div>

    </div>
  )
}

export default Featured
