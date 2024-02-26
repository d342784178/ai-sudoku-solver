/* /app/api/checkouts/route.js */

import {NextRequest, NextResponse} from 'next/server'
import {getServerSession} from "next-auth/next"
import {authOptions} from "../../auth/[...nextauth]/route"
import LemonSqueezy from '@lemonsqueezy/lemonsqueezy.js'

const ls = new LemonSqueezy(process.env.LEMONSQUEEZY_API_KEY as string)

export async function POST(req: NextRequest) {
    const session = await getServerSession(authOptions)

    if (!session) {
        return NextResponse.json({error: true, message: 'Not logged in.'}, {status: 401})
    }

    const resJson = await req.json()

    if (!resJson.variantId) {
        return NextResponse.json({error: true, message: 'No variant ID was provided.'}, {status: 400})
    }

    // Customise the checkout experience
    // All the options: https://docs.lemonsqueezy.com/api/checkouts#create-a-checkout
    const attributes = {
        'checkout_options': {
            'embed': true, // Use the checkout overlay
            'media': false,
            'button_color': '#fde68a'
        },
        'checkout_data': {
            'email': session.user.email, // Displays in the checkout form
            'custom': {
                'user_id': session.user.id // Sent in the background; visible in webhooks and API calls
            }
        },
        'product_options': {
            'enabled_variants': [resJson.variantId], // Only show the selected variant in the checkout
            'redirect_url': `${process.env.NEXT_PUBLIC_APP_URL}/billing/`,
            'receipt_link_url': `${process.env.NEXT_PUBLIC_APP_URL}/billing/`,
            'receipt_button_text': 'Go to your account',
            'receipt_thank_you_note': 'Thank you for signing up to Lemonstand!'
        }
    }

    console.log(attributes)
    try {
        const checkout = await ls.createCheckout({
            storeId: Number(process.env.LEMONSQUEEZY_STORE_ID) ,
            variantId: resJson.variantId,
            attributes
        })

        return NextResponse.json({'error': false, 'url': checkout['data']['attributes']['url']}, {status: 200})
    } catch (e) {
        // @ts-ignore
        return NextResponse.json({'error': true, 'message': e.message}, {status: 400})
    }

}