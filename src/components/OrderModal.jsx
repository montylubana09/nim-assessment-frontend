import React, { useState } from "react";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const placeOrder = async () => {
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone,
        address,
        items: order
      })
    });
    const data = await response.json();
    setOrderModal(data);
  };
  return (
    <>
      <div
        label="Close"
        className={styles.orderModal}
        onKeyPress={(e) => {
          if (e.key === "Escape") {
            setOrderModal(false);
          }
        }}
        onClick={() => setOrderModal(false)}
        role="menuitem"
        tabIndex={0}
      />
      <div className={styles.orderModalContent}>
        <h2>Place Order</h2>
        <form className={styles.form}>
          <div className={styles.formGroup}>
            <label htmlFor="name">
              Name
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setName(e.target.value);
                }}
                type="text"
                id="name"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="phone">
              Phone
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setPhone(e.target.value);
                }}
                type="phone"
                id="phone"
              />
            </label>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="address">
              Address
              <input
                onChange={(e) => {
                  e.preventDefault();
                  setAddress(e.target.value);
                }}
                type="phone"
                id="address"
              />
            </label>
          </div>
        </form>

        <div className={styles.orderModalButtons}>
          <button
            className={styles.orderModalClose}
            onClick={() => setOrderModal(false)}
          >
            Close
          </button>
          <button
            onClick={() => {
              placeOrder();
            }}
            className={styles.orderModalPlaceOrder}
          >
            Place Order
          </button>
        </div>
      </div>
    </>
  );
}

export default OrderModal;
