type OrderProduct = {
    productId: {
        _id: string;
        name: string;
        price: string;
    };
    color: string;
    size: string;
    image: string;
    quantity: number;
    price: number;
    subtotal: number;
}

export type OrderType = {
    _id: string;
    userId: string;
    products: OrderProduct[];
    total: number;
    status: "received" | "out_for_delivery" | "shipped" | "delivered" | "cancelled";
    payment_status: "pending" | "failed" | "success";
    paymentId?: string;
    address: {
        addressLine1: string;
        addressLine2: string;
        city: string;
        state: string;
        country: string;
        pincode: string;
    };
    orderId: string;
    createdAt: Date;
    updatedAt: Date;
}

export type AdminOrderUser = {
  _id: string;
  name: string;
  email: string;
};

export type AdminOrderProduct = {
  productId: string;
  name: string;
  price: number;
  quantity: number;
};

export type AdminOrder = {
  _id: string;
  orderId: string;
  status: "received" | "shipped" | "out_for_delivery" | "delivered" | "cancelled";
  payment_status: string;
  createdAt: string;
  updatedAt: string;
  address: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
  };
  products: AdminOrderProduct[];
  userId: AdminOrderUser;
};

export type AdminOrderResponse = {
  message: string;
  orders: AdminOrder[];
  totalOrders: number;
  totalPages: number;
  currentPage: number;
  results: number;
};
