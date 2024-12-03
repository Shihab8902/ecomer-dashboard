const overrides = {
    boilerplate: {
        id: 1,
        code: ` 
import type { ComponentType } from "react"
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

    },
    productName: {
        id: 2,
        code: `//For collecting product name
export function forProductName(Component): ComponentType {
return (props) => {
    const [store, setStore] = useStore()
    useEffect(() => {
        const captureProductName = () => {
            setStore({ productName: props.text })
        }

        captureProductName()
        const pollingInterval = setInterval(() => {
            captureProductName()
        }, 500) //Updates every 500ms

        return () => {
            clearInterval(pollingInterval)
            setStore({ productName: "" })
        }
    }, [])

    return <Component {...props} />
    }
}`
    },
    productId: {
        id: 3,
        code: `//For collecting product id
export function forProductId(Component): ComponentType {
    return (props) => {
        const [store, setStore] = useStore()

        useEffect(() => {
            const captureProductName = () => {
                setStore({
                    productId: props.text,
                })
            }

            captureProductName()
            const pollingInterval = setInterval(() => {
                captureProductName()
            }, 500) //Updates every 500ms

            return () => {
                clearInterval(pollingInterval)
                setStore({ productId: "" })
            }
        }, [])

        return <Component {...props} />
    }
}`
    }
}


export default overrides;