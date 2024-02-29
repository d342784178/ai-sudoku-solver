/* /app/billing/webhook/route.js */

// import prisma from '@/lib/prisma'
import {NextResponse} from 'next/server'

export async function POST(req: NextResponse) {

    // Make sure req is from Lemon Squeezy

    const crypto = require('crypto')

    const rawBody = await req.text()

    const secret = process.env.LEMONSQUEEZY_WEBHOOK_SECRET
    const hmac = crypto.createHmac('sha256', secret)
    const digest = Buffer.from(hmac.update(rawBody).digest('hex'), 'utf8')
    const signature = Buffer.from(req.headers.get('X-Signature') || '', 'utf8')

    if (!crypto.timingSafeEqual(digest, signature)) {
        throw new Error('Invalid signature.')
    }

    // Save the event

    const data = JSON.parse(rawBody)
    console.log(data)

    // const event = await prisma.webhookEvent.create({
    //     data: {
    //         eventName: data['meta']['event_name'],
    //         body: data
    //     },
    // })

    // Process the event
    // This could be done out of the main thread

    // processEvent(event)

    return new Response('Done')
}


