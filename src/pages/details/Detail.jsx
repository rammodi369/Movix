import React from 'react'
import { useParams } from 'react-router-dom'
import "./style.scss"
import useFetch from '../../hooks/useFetch'
import DetailsBanner from './detailBanner/DetailsBanner'
import Cast from './cast/Cast'


const Detail = () => {
  const {mediaType,id}=useParams();
const {data,loading}=useFetch(`/${mediaType}/${id}/videos`)
const {data:credits,loading:creditLoading}=useFetch(`/${mediaType}/${id}/credits`)

  return (
    <div>
      <DetailsBanner video={(data?.results?.[0])} crew={credits?.crew}/>
   <Cast data={credits?.cast}  loading={creditLoading}/>
    </div> 
  )
}

export default Detail
