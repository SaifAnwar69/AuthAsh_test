import { Modal, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { createOrder } from "../lib/orderHandler";
import { useStore } from "../store/store";
import styles from "../styles/OrderModal.module.css";

export default function OrderModal({ opened, setOpened, paymentMethod }) {
  const theme = useMantineTheme();
  const router = useRouter();
  const total = typeof window !== "undefined" && localStorage.getItem("total");
  const resetCart = useStore((state) => state.resetCart);
  const [formData, setFormData] = useState({});
  const [isButtonClicked, setIsButtonClicked] = useState(false); // Track button click

  const handleInput = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isButtonClicked) {
      return; // Ignore subsequent button clicks
    }
    
    setIsButtonClicked(true); // Mark button as clicked

    const id = await createOrder({ ...formData, total, paymentMethod });
    toast.success("Order Placed");
    resetCart();
    {
      typeof window !== "undefined" && localStorage.setItem("order", id);
    }
    router.push(`/order/${id}`);
  };

  return (
    <Modal
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      overlayOpacity={0.55}
      overlayBlur={3}
      opened={opened}
      onClose={() => setOpened(null)}
    >
      {/* Modal content */}
      <form onSubmit={handleSubmit} className={styles.orderModal}>
        <input
          onChange={handleInput}
          type="text"
          name="name"
          required
          placeholder="Name"
        />
        <input
          onChange={handleInput}
          type="text"
          name="phone"
          required
          placeholder="Phone Number"
        />
        <input
          onChange={handleInput}
          name="address"
          rows={3}
		  required
          placeholder="Address"
        />
        <span>
          You will pay <span>৳ {total}</span> on delivery
        </span>
        <button type="submit" className="btn" disabled={isButtonClicked}>
          Place Order
        </button>
      </form>
      <Toaster />
    </Modal>
  );
}
