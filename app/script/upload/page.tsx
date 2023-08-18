"use client"

import Button from 'react-bootstrap/Button';
// import WelcomeUser from '../../components/WelcomeUser';
import WelcomeUser from '../../components-dark-mode/WelcomeUser';
import { interBold, lato } from '../../fonts';

export default function UploadScript() {
  return (
    <div 
        className={"script-upload"}
        style={{
            margin: "0",
            width: "100%",
            height: "100vh",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            backgroundColor: "#1F2123"
    }}>
      {/* if no script uploaded, show this */}
      <WelcomeUser />
        <div style={{ fontSize: '60px'}} role="img" aria-label="movie">🎬</div>
        <h1 className={interBold.className} style={{color:"#fff", fontSize: '40px'}}><b>Let's Practice!</b></h1>
        <Button
            variant="none"
            size="lg"
            className={lato.className}
            href="/script/upload/choose-file"
            style={{
              backgroundColor:"#EC5500",
              marginTop: '24px',
              color: '#fff'
            }}
        >
            Upload Script
        </Button>
        {/* not sure how to overlap the elements */}
        {/* <svg width="1440" height="433" viewBox="0 0 1440 433" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1488.5 627.5C1488.5 882.38 727.746 996 446.998 996C166.251 996 -61.3398 789.38 -61.3398 534.5C-61.3398 279.621 71.2505 0 351.998 0C837.498 -3.05176e-05 1488.5 372.621 1488.5 627.5Z" fill="#FFE5D1"/>
        </svg> */}
        
    </div>
  )
}