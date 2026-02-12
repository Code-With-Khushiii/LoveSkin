import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setClearCart } from "../../../features/customer/cart/cartSlice";

const CartBottom = () => {
  const dispatch = useDispatch();
  const { cartTotalAmount, cartItems } = useSelector((store) => store.cart);

  const handleCheckout = async () => {
  const response = await fetch("http://localhost:4000/api/payment", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      totalAmount: cartTotalAmount,
    }),
  });

  const order = await response.json();

  const options = {
   key: "rzp_test_SEqmetXEwD6p3y",// your test key ID
    amount: order.amount,
    currency: order.currency,
    name: "LoveSkin",
    description: "Test Transaction",
    order_id: order.id,
    handler: function (response) {
      alert("Payment Successful 🎉");
    },
    theme: {
      color: "#3399cc",
    },
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};


  function formatPrice(price) {
    const userLocale = navigator.language || "en-US";
    return Number(price).toLocaleString(userLocale, {
      style: "currency",
      currency: "USD",
    });
  }

  return (
    <div className="space-y-2 border-t-2 bg-bgcolor p-4 font-urbanist">
      <div className="flex items-center justify-between">
        <h1 className="font-bold text-primary">SUBTOTAL</h1>
        <span className="rounded bg-primary py-1 px-2 text-sm text-white md:text-base">
          {formatPrice(cartTotalAmount)}
        </span>
      </div>

      <div className="grid items-center justify-items-center gap-2">
        <p className="text-center text-sm font-medium md:text-lg">
          Taxes and Shipping Will Calculate At Shipping
        </p>

        <button
          onClick={handleCheckout}
          className="rounded bg-primary py-1 px-2 text-sm text-white transition-all duration-100 ease-in-out hover:bg-secondary active:scale-90 active:bg-secondary md:text-base"
        >
          Check Out
        </button>
      </div>
    </div>
  );
};

export default CartBottom;
