import React from "react";
// import MobyNavbar from "../components/MobyNavbar"
import MobyNavbar from "../components-dark-mode/MobyNavbar"

export default function ScriptLayout ({
    children, 
}: {
    children: React.ReactNode
}) {
    return (
      <div>
        <MobyNavbar />
        {children}
      </div>
    )
}