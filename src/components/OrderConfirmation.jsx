import React from "react";
import styles from "./styles/OrderModal.module.css";

function OrderConfirmation({ order }) {
  return (
    <div className={styles.orderModalContent}>
      <h1>Thank you for your order!</h1>
      <br />
      <div>
        <div>
          <h2>Customer Information</h2>
          <p>Name: {order.name}</p>
          <p>Address: {order.address}</p>
        </div>
        <br />
        <div>
          <h2>Order Information</h2>
          <p>Order ID: {order.id}</p>
          <br />
          <h4>Items:</h4>
          <br />
          <ul>
            {order.items.map((items) => (
              <li key={items.item.id}>
                {items.item.name} - ${items.item.price}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmation;
