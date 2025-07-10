

// Declare a global interface for the Window object
declare global {
    interface Window {
      Razorpay: {
        new (options: RazorpayOptions): RazorpayInstance;
        setOptions(options: Partial<RazorpayOptions>): void; // Add other methods if you use them
        // You can add more methods here if the SDK exposes them globally
      };
    }
  }
  
  // Define the interfaces for Razorpay options and instance
  interface RazorpayOptions {
    key: string; // Your Razorpay Key ID
    amount: number; // Amount in paisa
    currency: string;
    name: string;
    description?: string;
    image?: string;
    order_id: string; // The order ID obtained from your backend
    handler?: (response: RazorpayPaymentSuccessResponse) => void;
    prefill?: {
      name?: string;
      email?: string;
      contact?: string;
    };
    notes?: {
      [key: string]: string;
    };
    theme?: {
      color?: string;
    };
    modal?: {
      ondismiss?: () => void;
      onclose?: () => void;
      escape: boolean;
      backdropclose: boolean;
      animation: boolean;
      confirm_close: boolean;
      confirm_close_on_escape: boolean;
      // ... other modal options
    };
    timeout?: number; // in seconds
    readonly?: {
      name?: boolean;
      email?: boolean;
      contact?: boolean;
    };
    hidden?: {
      contact?: boolean;
      email?: boolean;
    };
    retry?: {
      enabled?: boolean;
      max_count?: number;
    };
    // Add other options as per Razorpay documentation:
    // https://razorpay.com/docs/api/payments/
  }
  
  interface RazorpayInstance {
    open(): void;
    on(eventName: string, callback: (response: RazorpayPaymentSuccessResponse | RazorpayPaymentErrorResponse) => void): void; // Refined 'any' to specific types
    close(): void;
  }
  
  interface RazorpayPaymentSuccessResponse {
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  }
  
  // Optional: Add a more specific type for error responses if you handle them
  interface RazorpayPaymentErrorResponse {
    code: string;
    description: string;
    source: string;
    step: string;
    reason: string;
    metadata: {
      payment_id: string;
      order_id: string;
    };
  }