"use client";

import { useState } from 'react';
import { Price, ProductWithPrice } from '@/types';

import Modal from './Modal';
import Button from './Button';

interface SubscribeModalProps {
  products: ProductWithPrice[];
}

const formatPrice = (price: Price) => {
  const priceString = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: price.currency,
    minimumFractionDigits: 0
  }).format((price?.unit_amount || 0) / 100);

  return priceString;
};

const SubscribeModal: React.FC<SubscribeModalProps> = ({ products }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handleModalClose = () => {
    setIsOpen(false);
  };

  let content;

  if (products.length) {
    content = products.map((product) => {
      if (!product.prices?.length) {
        return (
          <div key={product.id}>
            No prices available
          </div>
        );
      }

      return product.prices.map((price) => (
        <Button
          key={price.id}
          onClick={() => {}}
          disabled
          className="mb-4"
        >
          {`Subscribe for ${formatPrice(price)} a ${price.interval}`}
        </Button>
      ));
    });
  } else {
    content = (
      <div className="text-center">
        No products available.
      </div>
    );
  }

  return (
    <Modal
      title="Only for premium users"
      description="Listen to music with Spotify Premium"
      isOpen={isOpen}
      onChange={handleModalClose}
    >
      {content}
    </Modal>
  );
};

export default SubscribeModal;
