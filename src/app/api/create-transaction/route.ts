import { NextResponse } from 'next/server';
import { coreApi, snap } from '@/lib/midtrans';
import type { DigitalProduct } from '@/lib/types';
import type { User } from 'firebase/auth';
import { randomUUID } from 'crypto';

export async function POST(request: Request) {
    try {
        const { product, user }: { product: DigitalProduct, user: User } = await request.json();

        if (!product || !user) {
            return NextResponse.json({ error: 'Data produk atau pengguna tidak lengkap' }, { status: 400 });
        }
        
        const orderId = `moodlab-${randomUUID()}`;
        const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:9002';

        // Gunakan Snap API untuk mendapatkan token
        const parameter = {
            transaction_details: {
                order_id: orderId,
                gross_amount: product.price,
            },
            item_details: [{
                id: product.id,
                price: product.price,
                quantity: 1,
                name: product.name,
                category: product.category || 'digital_product',
            }],
            customer_details: {
                first_name: user.displayName || user.email?.split('@')[0] || 'Customer',
                email: user.email || 'customer@example.com',
                phone: user.phoneNumber || '',
            },
            callbacks: {
                finish: `${appUrl}/pembayaran/selesai`,
                error: `${appUrl}/pembayaran/gagal`,
                pending: `${appUrl}/akun/riwayat-pesanan`
            },
            credit_card: {
                secure: true
            }
        };

        // Gunakan Snap untuk mendapatkan token
        const transaction = await snap.createTransaction(parameter);

        // Snap memberikan token yang dapat digunakan dengan snap.js
        return NextResponse.json(transaction);

    } catch (error: any) {
        console.error('Error creating transaction:', error.message || error);
        
        let errorMessage = 'Terjadi kesalahan pada server saat membuat transaksi.';
        // Handle specific Midtrans error
        if (error.ApiResponse) {
             console.error('Midtrans API Error:', error.ApiResponse);
             errorMessage = error.ApiResponse.status_message || 'Gagal berkomunikasi dengan Midtrans.';
        } else if (error.message) {
            errorMessage = error.message;
        }
        
        return NextResponse.json({ error: errorMessage }, { status: 500 });
    }
}
