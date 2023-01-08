import React from "react";
import { useState } from "react"
import { useAuthContext } from '../hooks/useAuthContext'

function SkillsBar () {

    const { user } = useAuthContext()
    const [ setError] = useState(null)

    if (!user) {
        setError('You must be logged in')
        return
      }

   return (
       <div className="container">
           <h1 className="title-text">Farming Progress Bar</h1>

           <div className="skill-box">
               <span className="title">Pumking</span>
               <div className="skill-bar">
                   <span className="skill-per html">
                       <span className="tooltip">95%</span>
                   </span>
               </div>
           </div>
           <div className="skill-box">
               <span className="title">Banana</span>
               <div className="skill-bar">
                   <span className="skill-per css">
                       <span className="tooltip">80%</span>
                   </span>
               </div>
           </div>
    
       </div>
   )
}

export default SkillsBar;