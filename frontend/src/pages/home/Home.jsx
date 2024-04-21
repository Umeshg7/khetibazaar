import React from 'react'
import Banner from '../../components/Banner'
import Categories from './Categories'
import Specialitems from './SpecialItems'
import Feedback from './Feedback'
import OurServices from './OurServices'
const Home = () => {
  return (
    <div>
      <Banner/>
      <Categories/>
      <Specialitems/>
      <Feedback/>
      <OurServices/>
    </div>
  )
}

export default Home

