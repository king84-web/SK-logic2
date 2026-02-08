import axios from 'axios'

const FLUTTERWAVE_API_URL = 'https://api.flutterwave.com/v3'
const FLUTTERWAVE_PUBLIC_KEY = process.env.FLUTTERWAVE_PUBLIC_KEY || ''
const FLUTTERWAVE_SECRET_KEY = process.env.FLUTTERWAVE_SECRET_KEY || ''

export interface FlutterWaveInitializePaymentParams {
  amount: number
  email: string
  phone_number: string
  customer_name: string
  tx_ref: string // Unique transaction reference
  currency?: string // Default: RWF for Rwanda, UGX for Uganda, KES for Kenya
  description: string
  redirect_url?: string
}

export interface FlutterWavePaymentResponse {
  status: string
  message: string
  data: {
    link: string
    payment_id: string
  }
}

export interface FlutterWaveVerifyResponse {
  status: string
  message: string
  data: {
    id: number
    amount: number
    status: string // successful, failed, pending
    currency: string
    tx_ref: string
    reference: string
    narration: string
    customer: {
      id: number
      name: string
      email: string
      phone_number: string
    }
    payment_type: string // mobile_money_ghana, mobile_money_uganda, mobile_money_rwanda, card
  }
}

/**
 * Initialize Flutterwave payment
 * Supports: Mobile Money (MTN, Airtel, Vodafone), Card payments
 */
export async function initializeFlutterWavePayment(
  params: FlutterWaveInitializePaymentParams
): Promise<FlutterWavePaymentResponse> {
  try {
    const payload = {
      public_key: FLUTTERWAVE_PUBLIC_KEY,
      tx_ref: params.tx_ref,
      amount: params.amount,
      currency: params.currency || 'RWF', // Default to Rwandan Franc
      redirect_url: params.redirect_url || `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/payment-callback`,
      customer: {
        email: params.email,
        phone_number: params.phone_number,
        name: params.customer_name,
      },
      customizations: {
        title: 'SK Logic Payment',
        description: params.description,
        logo: 'https://your-app-url.com/logo.png',
      },
    }

    const response = await axios.post(
      `${FLUTTERWAVE_API_URL}/payments`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Flutterwave initialization error:', error.response?.data || error.message)
    throw new Error(`Failed to initialize payment: ${error.message}`)
  }
}

/**
 * Verify Flutterwave payment
 */
export async function verifyFlutterWavePayment(
  transactionId: string
): Promise<FlutterWaveVerifyResponse> {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_API_URL}/transactions/${transactionId}/verify`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Flutterwave verification error:', error.response?.data || error.message)
    throw new Error(`Failed to verify payment: ${error.message}`)
  }
}

/**
 * Get transaction by reference
 */
export async function getFlutterWaveTransactionByRef(
  txRef: string
): Promise<any> {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_API_URL}/transactions/verify_by_reference?tx_ref=${txRef}`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Flutterwave transaction lookup error:', error.response?.data || error.message)
    throw new Error(`Failed to lookup transaction: ${error.message}`)
  }
}

/**
 * Get all transactions
 */
export async function getAllFlutterWaveTransactions(limit: number = 100): Promise<any> {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_API_URL}/transactions?limit=${limit}`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Flutterwave transactions error:', error.response?.data || error.message)
    throw new Error(`Failed to get transactions: ${error.message}`)
  }
}

/**
 * Get supported payment methods for a country
 */
export async function getSupportedPaymentMethods(country: string): Promise<any> {
  try {
    const response = await axios.get(
      `${FLUTTERWAVE_API_URL}/payment-options?country=${country}`,
      {
        headers: {
          Authorization: `Bearer ${FLUTTERWAVE_SECRET_KEY}`,
        },
      }
    )

    return response.data
  } catch (error: any) {
    console.error('Flutterwave payment methods error:', error.response?.data || error.message)
    throw new Error(`Failed to get payment methods: ${error.message}`)
  }
}

/**
 * Africa supported currencies and countries
 */
export const AFRICA_PAYMENT_SUPPORT = {
  RWF: {
    country: 'Rwanda',
    currency: 'RWF',
    methods: ['mobile_money_rwanda', 'card'],
    providers: ['MTN Rwanda', 'Airtel Rwanda'],
  },
  UGX: {
    country: 'Uganda',
    currency: 'UGX',
    methods: ['mobile_money_uganda', 'card'],
    providers: ['MTN Uganda', 'Airtel Uganda'],
  },
  KES: {
    country: 'Kenya',
    currency: 'KES',
    methods: ['mobile_money_kenya', 'card'],
    providers: ['M-Pesa', 'Airtel Money'],
  },
  GHS: {
    country: 'Ghana',
    currency: 'GHS',
    methods: ['mobile_money_ghana', 'card'],
    providers: ['MTN Ghana', 'Vodafone Ghana', 'AirtelTigo Ghana'],
  },
  NGN: {
    country: 'Nigeria',
    currency: 'NGN',
    methods: ['card', 'bank_transfer'],
    providers: ['USSD', 'Card'],
  },
  ZAR: {
    country: 'South Africa',
    currency: 'ZAR',
    methods: ['card', 'bank_transfer'],
    providers: ['Credit Card', 'EFT'],
  },
}
