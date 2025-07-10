import { NextRequest, NextResponse } from 'next/server';
import Razorpay from 'razorpay';
import { orders } from '../../../../migrations/schema';
import { db } from '@/lib/database/db';

const razorpay = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

export async function POST(request: NextRequest) {

    const { totalAmount, createdAt, eventId, userId } = await request.json();

    try{
        const order = await razorpay.orders.create({
            amount: totalAmount * 100,
            currency: 'INR',
            receipt: `receipt_${Math.random().toString(36).substring(7)}`
        });

        const orderRes = await db.insert(orders).values({
            totalAmount,
            createdAt,
            eventId,
            userId
        });

        return NextResponse.json({
            message: "Order created successfully",
            status: 200,
            success: true,
            data: {
                orderId: order.id,
                orderDetails: orderRes
            }
        });
    } catch (error) {
        console.error("Error creating order:", error);
        return NextResponse.json({
            message: "Failed to create order",
            status: 500,
            success: false,
            error: error instanceof Error ? error.message : "Error creating order"
        })
    }
}