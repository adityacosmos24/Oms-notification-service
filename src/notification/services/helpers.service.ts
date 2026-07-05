import { Injectable } from "@nestjs/common";

@Injectable()
export class HelpersService {
    async getOrderDetails(orderId?: string) {
        if (!orderId) return null;

        //Fake DB response for now 
        return {
            orderId,
            orderAmount: 2499,
            itemCount: 'Aditya',
            productNames: ['Running Shoes', 'T-Shirt'],
            trackingId: 'TRK12345',
        }
    }

    async getReturnDetails(orderId?: string) {
        if (!orderId) return null;

        return {
            orderId,
            returnReason: 'Size issue',
            refundAmount: 1499,
            customerName: 'Aditya',
        };
    }

    async getExchangeDetails(orderId?: string) {
        if (!orderId) return null;

        return {
            orderId,
            exchangeProductName: 'Blue Hoodie - Size M',
            customerName: 'Aditya',
        };
    }

    async getRefundDetails(orderId?: string) {
        if (!orderId) return null;

        return {
            orderId,
            refundAmount: 1499,
            refundMode: 'BANK',
            customerName: 'Aditya',
        };
    }
}