import React from "react"

import Footer from "../components/common/Footer"
import ContactDetails from "../components/ContactPage/ContactDetails"
import ContactForm from "../components/ContactPage/ContactForm"
import ReviewSlider from "../components/common/ReviewSlider"

const Contact = () => {
  return (
    <>
      <div className="mx-auto mt-20 mb-20 flex w-11/12 max-w-maxContent flex-col justify-between gap-10 text-white lg:flex-row">

        {/* Contact Details */}
        <div className="lg:w-[40%]  transition-all duration-500 hover:scale-105">
          <ContactDetails />
        </div>

        {/* Contact Form */}
        <div className="lg:w-[60%]">
          <ContactForm />
        </div>

      </div>



      {/* <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-richblack-900 text-white">
  
        <h1 className="text-center text-4xl font-semibold mt-8">
          Reviews from other learners
        </h1>
        <ReviewSlider />

      </div> */}


      <Footer />
    </>
  )
}

export default Contact