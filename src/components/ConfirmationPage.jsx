import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import OrderConfirmation from "./OrderConfirmation";

function ConfirmationPage() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    async function fetchOrder() {
      const response = await fetch(`/api/orders/${id}`);
      const data = await response.json();
      setOrder(data);
    }

    fetchOrder();
  }, [id]);

  if (!order) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <OrderConfirmation order={order} />
    </div>
  );
}

export default ConfirmationPage;
