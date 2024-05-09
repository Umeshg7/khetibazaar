import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Specialitems from './SpecialItems'
import OurServices from './OurServices'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <Specialitems/>
      <OurServices/>
    </div>
  )
}

export default Home

