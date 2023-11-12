"use client"
import { Combobox } from '@/components/Combobox'
import Player from '@/components/Player'
import {SongList} from '@/components/SongList'

import React from 'react'

const Home
 = () => {
  
  return (
    <div className=' w-full'>
      <div className='w-full flex justify-around p-10'>
      <Combobox /></div>
      <SongList />
      <Player />
      
    </div>
  )
}

export default Home
