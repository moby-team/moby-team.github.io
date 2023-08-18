'use client'
import { lato, latoBold } from "../fonts"

export default function WelcomeUser () {
  return (
    <div
      style={{
        marginBottom:"5%",
        marginTop:"5%",
      }}>
        <p className={lato.className} style={{fontSize:"24pt"}}>Welcome, <b className={latoBold.className} style={{fontSize:"24pt"}}> User </b> 👋</p>
      </div>
  )
}