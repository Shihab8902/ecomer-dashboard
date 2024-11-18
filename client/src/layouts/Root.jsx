import React from "react"
import { Outlet } from "react-router-dom"

const Root = () => {
    return <main className="bg-[#F1F1F1]">
        <Outlet />
    </main>
}

export default Root