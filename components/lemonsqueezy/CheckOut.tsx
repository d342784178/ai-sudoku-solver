/* /components/plan-button.jsx */

'use client'

import {useState} from 'react'
import {message} from "antd";

export default function CheckOut({}) {

    const [isMutating, setIsMutating] = useState(false)
    const [messageApi, msgContextHolder] = message.useMessage();

    async function createCheckout(e: any, variantId: string) {
        e.preventDefault()

        setIsMutating(true)

        // Create a checkout
        const res = await fetch('/api/billing/checkouts', {
            method: 'POST',
            body: JSON.stringify({
                variantId: variantId
            })
        })
        const checkout = await res.json()
        if (checkout.error) {
            messageApi.error(checkout.message)
            // console.error(checkout.message)
        } else {
            // LemonSqueezy.Url.Open(checkout['url'])
            window.open(checkout['url'])
            console.log(checkout)
        }

        setIsMutating(false)
    }

    return (
        <div>
            {msgContextHolder}
            <a
                href="#"
                onClick={(e) => createCheckout(e, '260876')}
                className="block text-center py-2 px-5 bg-amber-200 rounded-full font-bold text-amber-800 shadow-md shadow-gray-300/30 select-none">
                <span className="leading-[28px] inline-block">Check Out</span>
            </a>
        </div>
    )
}