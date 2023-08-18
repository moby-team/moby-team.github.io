'use client'
import { lato, latoBold } from "../fonts"

export default function WelcomeUser () {
  return (
    <div
      style={{
        marginTop:"5%",
      }}>
        <p className={lato.className} style={{fontSize:"24pt", color:"white"}}>Welcome, <b className={latoBold.className} style={{fontSize:"24pt", color:"white"}}> User </b> 👋</p>
      </div>
  )
}