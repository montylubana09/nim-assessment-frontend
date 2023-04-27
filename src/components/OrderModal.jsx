import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles/OrderModal.module.css";

function OrderModal({ order, setOrderModal }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState([]);
  const navigate = useNavigate();
  const placeOrder = async () => {
    const validationErrors = [];
    if (!name) {
      validationErrors.push({ field: "name", message: "Name is required *" });
    }
    if (!phone) {
      validationErrors.push({ field: "phone", message: "Phone is required *" });
    } else if (!/^\d{3}-?\d{3}-?\d{4}$/.test(phone)) {
      validationErrors.push({ field: "phone", message: "Phone is Invalid *" });
    }

    if (!address) {
      validationErrors.push({
        field: "address",
        message: "address is required *"
      });
    }

    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const formattedPhoneNumber = phone.replace(
      /(\d{3})(\d{3})(\d{4})/,
      "($1) $2-$3"
    );
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        phone: formattedPhoneNumber,
        address,
        items: order
      })
    });

    const data = await response.json();
    if (response.status === 200) {
      navigate(`/order-confirmation/${data.id}`);
    }
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
              {errors.find((error) => error.field === "name") && (
                <div className={styles.errorMessage}>
                  {errors.find((error) => error.field === "name")?.message}
                </div>
              )}
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
              {errors.find((error) => error.field === "phone") && (
                <div className={styles.errorMessage}>
                  {errors.find((error) => error.field === "phone").message}
                </div>
              )}
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
              {errors.find((error) => error.field === "address") && (
                <div className={styles.errorMessage}>
                  {errors.find((error) => error.field === "address").message}
                </div>
              )}
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
          {/* {errors.length > 0 && (
            <div className={styles.errorMessage}>
              {errors.map((error) => (
                <p key={error}>{error}</p>
              ))}
            </div>
          )} */}
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
