import React, { useEffect, useState } from 'react'
import Footer from '../components/common/Footer'
import { useParams } from 'react-router-dom'
import { apiConnector } from '../services/apiconnector';
import { categories } from '../services/apis';
import { getCatalogaPageData } from '../services/operations/pageAndComponentData';
import Course_Card from '../components/core/Catalog/Course_Card';
import CourseSlider from '../components/core/Catalog/CourseSlider';
import { useSelector } from "react-redux"
import Error from "./Error"

const Catalog = () => {

    const { loading } = useSelector((state) => state.profile)
    const { catalogName } = useParams()
    // const [active, setActive] = useState(1)
    const [catalogPageData, setCatalogPageData] = useState(null);
    const [categoryId, setCategoryId] = useState("");

    //Fetch all categories
    console.log(catalogName);
    useEffect(()=> {
        const getCategories = async() => {
            const res = await apiConnector("GET", categories.CATEGORIES_API);
            const category_id = 
            res?.data?.data?.filter((ct) => ct.name.split(" ").join("-").toLowerCase() === catalogName)[0]._id;
            setCategoryId(category_id);
        }
        getCategories();
    },[catalogName]);

    useEffect(() => {
        const getCategoryDetails = async() => {
            try{
                const res = await getCatalogaPageData(categoryId);
                console.log("Printing res: ", res);
                setCatalogPageData(res);
            }
            catch(error) {
                console.log(error)
            }
        }
        if(categoryId) {    // agr ye yahan nhi laga te toh null ke liye call jane ki wajah se api error aa rha tha
            getCategoryDetails();
        }
        
    },[categoryId]);


    if (loading || !catalogPageData) {
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="spinner"></div>
          </div>
        )
      }
      if (!loading && !catalogPageData.success) {
        return <Error />
      }
    
      return (
        <>
          {/* Hero Section */}
          
          <div className=" box-content  bg-richblack-800 px-4">
            <div className="mx-auto flex min-h-[250px] max-w-maxContentTab flex-col justify-center gap-4 lg:max-w-maxContent py-4">
              <p className="text-sm text-richblack-300">
                {`Home / Catalog / `}
                <span className="text-yellow-25">
                  {catalogPageData?.data?.selectedCategory?.name}
                </span>
              </p>
              <p className="text-3xl text-richblack-5">
                {catalogPageData?.data?.selectedCategory?.name}
              </p>
              <p className="max-w-[870px] text-richblack-200">
                {catalogPageData?.data?.selectedCategory?.description}
              </p>
            </div>
          </div>
    
          {/* Section 1 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading mb-10">Courses to Launch Your <span className='text-yellow-25'>{catalogPageData?.data?.selectedCategory?.name}</span> Journey</div>

            {/* <div className="my-4 flex border-b border-b-richblack-600 text-sm">
              <p
                className={`px-4 py-2 ${
                  active === 1
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(1)}
              >
                Most Populer
              </p>
              <p
                className={`px-4 py-2 ${
                  active === 2
                    ? "border-b border-b-yellow-25 text-yellow-25"
                    : "text-richblack-50"
                } cursor-pointer`}
                onClick={() => setActive(2)}
              >
                New
              </p>
            </div> */}
            
            <div className=' p-2'>
              <CourseSlider
                Courses={catalogPageData?.data?.selectedCategory?.courses}
              />
            </div>
          </div>


          {/* Section 2 */}
          <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading mb-10">
              Top courses in <span className='text-yellow-25'>{catalogPageData?.data?.differentCategory?.name}</span>
            </div>
            <div className="p-2 ">
              <CourseSlider
                Courses={catalogPageData?.data?.differentCategory?.courses}
              />
            </div>
          </div>
    
          {/* Section 3 */}
          {/* <div className=" mx-auto box-content w-full max-w-maxContentTab px-4 py-12 lg:max-w-maxContent">
            <div className="section_heading">Frequently Bought</div>
            <div className="py-8">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {catalogPageData?.data?.mostSellingCourses
                  ?.slice(0, 4)
                  .map((course, i) => (
                    <Course_Card course={course} key={i} Height={"h-[400px]"} />
                  ))}
              </div>
            </div>
          </div> */}
    
          <Footer />
        </>
      )
    }
    
    export default Catalog







    // export const getCatalogaPageData = async(categoryId) => {
    //   const toastId = toast.loading("Loading...");
    //   let result = [];
    //   try{
    //         const response = await apiConnector("POST", catalogData.CATALOGPAGEDATA_API, 
    //         {categoryId: categoryId,});
    
    //         if(!response?.data?.success)
    //             throw new Error("Could not Fetch Category page data");
    
    //          result = response?.data;
    
    //   }
    //   catch(error) {
    //     console.log("CATALOG PAGE DATA API ERROR....", error);
    //     toast.error(error.message);
    //     result = error.response?.data;
    //   }
    //   toast.dismiss(toastId);
    //   return result;
    // }










    // exports.categoryPageDetails = async (req, res) => {
    //   try {
    //     const { categoryId } = req.body
    //     console.log("PRINTING CATEGORY ID: ", categoryId);
    //     // Get courses for the specified category
    //     const selectedCategory = await Category.findById(categoryId)
    //       .populate({
    //         path: "courses",
    //         match: { status: "Published" },
    //         populate: "ratingAndReviews",
    //       })
    //       .exec()
    
    //     
    //      Handle the case when the category is not found

    //     if (!selectedCategory) {
    //       console.log("Category not found.")
    //       return res
    //         .status(404)
    //         .json({ success: false, message: "Category not found" })
    //     }

    //      Handle the case when there are no courses

    //     if (selectedCategory.courses.length === 0) {
    //       console.log("No courses found for the selected category.")
    //       return res.status(404).json({
    //         success: false,
    //         message: "No courses found for the selected category.",
    //       })
    //     }
    //     res.status(200).json({
    //       success: true,
    //       data: {
    //         selectedCategory
    //       },
    //     })
    //   } catch (error) {
    //     return res.status(500).json({
    //       success: false,
    //       message: "Internal server error",
    //       error: error.message,
    //     })
    //   }
    // }