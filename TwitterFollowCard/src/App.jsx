import { useState } from 'react'
import './App.css'
import { TwitterFollowCard } from './TwitterFollowCard'
export function App (){ 
   return (
    <section className='App'>
    <TwitterFollowCard  userName="midudev" >
        Probando
     </TwitterFollowCard>
    </section>
   ) 
}
