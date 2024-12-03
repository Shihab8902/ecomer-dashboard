const overrides = {
    boilerplate: {
        id: 1,
        code: `import type { ComponentType } from "react"
import { createStore } from "https://framer.com/m/framer/store.js@^1.0.0"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from "uuid"

//Capture store id
const STORE_ID = localStorage.getItem("ecommer-store-id")

//Data store
const useStore = createStore({
    productId: "",
    productName: "",
    quantity: 1,
    price: 0,
    image: "",
})

//Main code here`
    }
}


export default overrides;