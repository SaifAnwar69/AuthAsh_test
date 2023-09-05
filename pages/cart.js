import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Layout from "../components/Layout";
import OrderModal from "../components/OrderModal";
import { urlFor } from "../lib/client";
import { useStore } from "../store/store";
import styles from "../styles/Cart.module.css";

export default function Cart() {
  const CartData = useStore((state) => state.cart);
  const removePizza = useStore((state) => state.removePizza);
  const [paymentMethod, setPaymentMethod] = useState(null);
  const [order, setOrder] = useState(
    typeof window !== "undefined" && localStorage.getItem("order")
  );
  const router = useRouter();

  const handleRemove = (i) => {
    removePizza(i);
    toast.error("Item Removed");
  };
  const total = () =>
    CartData.pizzas.reduce((a, b) => a + b.quantity * b.price, 0);

  const handelOnDelivery = () => {
    setPaymentMethod(0);
    typeof window !== "undefined" && localStorage.setItem("total", total());
  };

  const handelCheckout = async () => {
    typeof window !== "undefined" && localStorage.setItem("total", total());
    setPaymentMethod(1);
    const response = await fetch("/api/stripe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(CartData.pizzas),
    });
    if (response.status === 500) return;
    const data = await response.json();
    toast.loading("Redirecting...");
    router.push(data.url);
  };

  return (
    <Layout>
      <div className={styles.cart}>
        {/* details */}
        <div className={styles.details}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Item</th>
                <th>Name</th>
                {/* <th>Size</th> */}
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody className={styles.tbody}>
              {CartData.pizzas.length > 0 &&
                CartData.pizzas.map((pizza, i) => {
                  const src = urlFor(pizza.image).url();
                  return (
                    <tr key={i}>
                      <td className={styles.imageTd}>
                        <Image
                          loader={() => src}
                          src={src}
                          alt={pizza.name}
                          width="85"
                          height="85"
                        />
                      </td>
                      <td>{pizza.name}</td>
                      {/* <td>
                        {pizza.size === 0
                          ? "Small"
                          : pizza.size === 1
                          ? "Medium"
                          : "Large"}
                      </td> */}
                      <td>{pizza.price}</td>
                      <td>{pizza.quantity}</td>
                      <td>{pizza.price * pizza.quantity}</td>
                      <td
                        onClick={() => handleRemove(i)}
                        className={styles.clouse}>
                        x
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          {/* summart */}
          <div className={styles.summart}>
            <span>Cart</span>
            <div className={styles.CartDetails}>
              <div>
                <span>Items</span>
                <span>{CartData.pizzas.length}</span>
              </div>
              <div>
                <span>Total</span>
                <span>৳ {total()}</span>
              </div>
            </div>

            {!order && CartData.pizzas.length > 0 ? (
              <div className={styles.buttons}>
                <button onClick={handelOnDelivery} className="btn">
                  Pay on Delivery
                </button>
                {/* <button onClick={handelCheckout} className="btn">
                  Pay Now
                </button> */}
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Toaster />
      {/* Modal */}
      <OrderModal
        opened={paymentMethod === 0}
        setOpened={setPaymentMethod}
        paymentMethod={paymentMethod}
      />
    </Layout>
  );
}
