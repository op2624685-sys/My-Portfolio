import React from 'react'
import Navbar from '../component/Navbar'
import Title from '../component/Title'
import JavaMain from '../component/JavaMain'

const Index = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Navbar />
      <Title />
      <JavaMain />
    </div>
  )
}

export default Index
