import { useState, useCallback } from 'react';

export default function useHttp(requestFunction) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (...args) => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await requestFunction(...args);
        setIsLoading(false);
        return data;
      } catch (err) {
        setError(err.message || 'Something went wrong!');
        setIsLoading(false);
        throw err;
      }
    },
    [requestFunction]
  );

  return { isLoading, error, sendRequest };
}

export async function fetchAvailableMeals() {
  const res = await fetch('http://localhost:3000/meals');
  const resData = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch meals.');
  }
  return resData;
}

export async function fetchAvailableOrder() {
  const res = await fetch('http://localhost:3000/orders');
  const resData = await res.json();
  if (!res.ok) {
    throw new Error('Failed to fetch orders.');
  }
  return resData;
}

export async function updateItemsInCart(orders) {
  const res = await fetch('http://localhost:3000/orders', {
    method: 'PUT',
    body: JSON.stringify({ orders: orders }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const resData = await res.json();
  if (!res.ok) {
    throw new Error(resData.message || 'Failed to update user data.');
  }
  return resData.orders;
}

export async function submitOrder(orderData) {
  const response = await fetch('http://localhost:3000/customer-orders', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(orderData),
  });
  console.log(orderData);
  if (!response.ok) {
    throw new Error('Failed to submit order');
  }
  return response.json();
}
