import Image from "next/image";
import { useEffect } from "react";
// import { SlSocialDropbox } from "react-icons/sl";
import { UilBill, UilBox } from "@iconscout/react-unicons";
// import { TbFileDollar } from "react-icons/tb";
import Cooking from "../../assets/cooking.png";
import OnWay from "../../assets/onway.png";
import Spinner from "../../assets/spinner.svg";
import Layout from "../../components/Layout";
import { client } from "../../lib/client";
import styles from "../../styles/Orders.module.css";

export const getServerSideProps = async ({ params }) => {
  const query = `*[_type == 'order' && _id == '${params.id}']`;
  const order = await client.fetch(query);

  return {
    props: {
      order: order[0],
    },
  };
};

export default function Orders({ order }) {
  useEffect(() => {
    if (order.status > 3) {
      localStorage.clear();
    }
  }, [order]);
  return (
    <Layout>
      <div className={styles.orders}>
        <span className={styles.heading}>Order in Process</span>
        <div className={styles.details}>
          <div>
            <span>Order ID</span>
            <span>{order._id}</span>
          </div>
          <div>
            <span>Customer Name</span>
            <span>{order.name}</span>
          </div>
          <div>
            <span>Phone</span>
            <span>{order.phone}</span>
          </div>
          <div>
            <span>Method</span>
            <span>
              {order.method === 0 ? "Cash on Deliver" : "Online Payment(Paid)"}
            </span>
          </div>
          <div>
            <span>Total</span>
            <span>৳ {order.total}</span>
          </div>
        </div>
        <div className={styles.statusContainer}>
          <div className={styles.status}>
            <UilBill width={50} height={50} />
            <span>Payment</span>
            {order.method === 0 ? (
              <span className={styles.peyOndel}>On Delivery</span>
            ) : (
              <span className={styles.completed}>Completed</span>
            )}
          </div>

          <div className={styles.status}>
            <Image src={Cooking} alt="Cooking" width={50} height={50} />
            <span>Processing</span>
            {order.status === 1 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="Spinner" width={120} height={120} />
              </div>
            )}

            {order.status > 1 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
          <div className={styles.status}>
            <Image src={OnWay} alt="Onway" width={50} height={50} />
            <span>On Way</span>
            {order.status === 2 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="Spinner" width={120} height={120} />
              </div>
            )}

            {order.status > 2 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
          <div className={styles.status}>
            <UilBox width={50} height={50} />
            <span>Delivered</span>
            {order.status === 3 && (
              <div className={styles.spinner}>
                <Image src={Spinner} alt="Spinner" width={120} height={120} />
              </div>
            )}

            {order.status > 3 && (
              <span className={styles.completed}>Completed</span>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
