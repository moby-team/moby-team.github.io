"use client"

import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { latoBold, poppinsBold } from '../../fonts';

// navigate to this page when an error occurs
export default function Error({
  error,
  // reset,
}: {
  error: Error
  // reset: () => void
}) {

  useEffect(() => {
    console.error(error)
  }, [error])

  console.log("in error comp", error);

  return (
    <div 
      className={"error"}
      style={{
        paddingTop: "113px",
        width: "100%",
        height: "100vh",
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#1F2123"
      }}>
      <svg width="183" height="183" viewBox="0 0 183 183" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18.7959 138.847L88.0523 21.1112C89.5989 18.4819 93.4011 18.4819 94.9477 21.1112L164.204 138.847C165.773 141.513 163.85 144.875 160.756 144.875H22.2437C19.15 144.875 17.2274 141.513 18.7959 138.847Z" stroke="#EC5500" strokeWidth="5" strokeLinejoin="round"/>
      <rect x="88" y="53" width="8" height="53" rx="4" fill="#EC5500"/>
      <circle cx="92.5" cy="121.5" r="4.5" fill="#EC5500"/>
      </svg>

      <span className={poppinsBold.className} style={{fontSize:"24pt", color:"white"}}>Oops!</span>
      <span className={poppinsBold.className} style={{fontSize:"24pt", marginBottom:"1em", color:"white"}}>Moby couldn't upload your script.</span>
      <Button variant="none" size="lg" href="/script/upload/choose-file" className={"error-button"} style={{ backgroundColor:"#EC5500" }}>
          <span className={latoBold.className} style={{paddingLeft:"0.5em", paddingRight:"0.5em", color:"white"}}>Try Again</span>
      </Button>
      <Button variant="none" size="lg" href="/" className={"error-button"} style={{borderColor:"white"}}>
          <span className={latoBold.className} style={{color:"white", paddingLeft:"0.5em", paddingRight:"0.5em"}}>Back to Home</span>
      </Button>

    </div>
  ) 
}