import { current } from '@reduxjs/toolkit'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handlePageButtonClick } from '../features/cars/carsSlice'
import { useNavigate,useParams } from 'react-router-dom'
import {AiOutlineLeft,AiOutlineRight} from 'react-icons/ai'


const PageButtonsContainer = ({isLastPage}) => {

  const {cars,carsPerPage,page,totalCars} = useSelector(state=>state.cars)
  const dispatch = useDispatch()

  const [currentPage,setCurrentPage] = useState(page)
  const navigate = useNavigate()
  
  console.log(isLastPage)

  const startIndex = (currentPage - 1) * carsPerPage
  const endIndex = startIndex + carsPerPage

  // const pageNumer = useParams().pageNumber


  const totalPages = Math.ceil(totalCars / carsPerPage);
  

  const handleClick = (pageNumber)=>{
    if (pageNumber >= 1 && pageNumber <= totalPages) {
      dispatch(handlePageButtonClick(pageNumber))
      navigate(`/page/${pageNumber}`)
      
    }
  }

  console.log(endIndex)

  return (
    <div className="navbar bg-base-100 mb-1">
  
  <div className="flex-none px-4 ms-auto">
   {/* BUTTONS */}

   <button disabled={page===1} onClick={()=>handleClick(page-1)}  className="btn ml-3 btn-primary"><AiOutlineLeft /></button>
{[...Array(10)].map((item,index)=>{
  return <button disabled={page===index+1} onClick={()=>handleClick(index+1)}  className="btn ml-3 btn-primary">{index+1}</button>
})}
<button   onClick={()=>handleClick(page+1)} disabled={isLastPage}  className="btn ml-3 btn-primary"><AiOutlineRight /></button>
   
  </div>
</div>
  )
}

export default PageButtonsContainer