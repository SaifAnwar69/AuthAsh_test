import Image from "next/image";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import LeftArrow from "../../assets/arrowLeft.png";
import RightArrow from "../../assets/arrowRight.png";
import Layout from "../../components/Layout";
import { client, urlFor } from "../../lib/client";
import { useStore } from "../../store/store";
import styles from "../../styles/Pages.module.css";

export default function Pizza({ pizza }) {
  const src = urlFor(pizza.image).url();

  const [size, setSize] = useState(0);
  const [quantity, setQuantity] = useState(1);

  // handle Quantity
  const handleQuantity = (type) => {
    type === "inc"
      ? setQuantity((prev) => prev + 1)
      : quantity === 1
      ? null
      : setQuantity((prev) => prev - 1);
  };

  // add to cart function
  const addPizza = useStore((state) => state.addPizza);
  const addToCart = () => {
    addPizza({
      ...pizza,
      price: pizza.price[size],
      quantity: quantity,
      size: size,
    });
    toast.success("Added to Cart");
  };
  return (
    <Layout>
      <div className={styles.page}>
        {/* right side */}
        <div className={styles.right}>
          <div className={styles.ImageWrapper}>
            <Image
              loader={() => src}
              src={src}
              alt={pizza.name}
              width="200"
              height="200"
              layout="fill"
              unoptimized
              objectFit=""
            />
          </div>
          <span>{pizza.name}</span>
          <span>{pizza.details}</span>
          <span>
            <span style={{ color: "var(--themeRed)" }}>৳.</span>{" "}
            {pizza.price[size] * quantity}
          </span>
          <div className={styles.size}>
            <span>Size</span>
            <div className={styles.SizeVaraints}>
              <div
                className={size === 0 ? styles.selected : ""}
                onClick={() => setSize(0)}>
                Small
              </div>
              <div
                className={size === 1 ? styles.selected : ""}
                onClick={() => setSize(1)}>
                Medium
              </div>
              {/* <div
                className={size === 2 ? styles.selected : ""}
                onClick={() => setSize(2)}>
                Large
              </div> */}
            </div>
          </div>
          {/* Quantity counter */}
          <div className={styles.quantity}>
            <span>Quantity</span>

            <div className={styles.counter}>
              <Image
                onClick={() => handleQuantity("dec")}
                src={LeftArrow}
                width={20}
                height={20}
                alt="LeftArrow"
              />
              <span>{quantity}</span>
              <Image
                onClick={() => handleQuantity("inc")}
                src={RightArrow}
                width={20}
                height={20}
                alt="RightArrow"
                objectFit="contain"
              />
            </div>
          </div>
          {/* button */}
          <button onClick={addToCart} className={`btn ${styles.btn}`}>
            Add to Card
          </button>
        </div>
        <Toaster />
      </div>
    </Layout>
  );
}

export async function getStaticPaths() {
  const paths = await client.fetch(
    `*[_type=="pizza" && defined(slug.current)][].slug.current`
  );
  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: "blocking",
  };
}

export async function getStaticProps(context) {
  const { slug = "" } = context.params;
  const pizza = await client.fetch(
    `*[_type=="pizza" && slug.current == '${slug}'][0]`
  );
  return {
    props: {
      pizza,
    },
  };
}
