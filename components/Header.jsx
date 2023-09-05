import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { UilShoppingBag, UilBill } from "@iconscout/react-unicons";
// import { TbFileDollar } from "react-icons/tb";
import Logo from "../assets/Logo.png";
import { useStore } from "../store/store";
import styles from "../styles/Header.module.css";

export default function Header() {
	const [order, setOrder] = useState("");
	const items = useStore((state) => state.cart.pizzas.length);

	useEffect(() => {
		setOrder(localStorage.getItem("order"));
	}, []);
	return (
		<header className={styles.header}>
			{/* logo side */}
			<div className={styles.logo}>
				<Image src={Logo} alt="Logo" width={50} height={50} />
				<span>Autistic Ash</span>
			</div>
			{/* menu side */}
			<nav className={styles.nav}>
				<ul className={styles.menu}>
					<li>
						<Link href="../">Home</Link>
					</li>
					{/* <li>Menu</li> */}
					{/* <li>Contact</li> */}
				</ul>
			</nav>
			{/* right side */}
			<div className={styles.rightSide}>
				<Link href="/cart">
					<div className={styles.cart}>
						<UilShoppingBag size={35} color="#2E2E2E" />
						<div className={styles.badge}>{items}</div>
					</div>
				</Link>

				{order && (
					<Link href={`/order/${order}`}>
						<div className={styles.order}>
							<UilBill size={35} color="#2E2E2E" />
							{order != "" && <div className={styles.badge}>1</div>}
						</div>
					</Link>
				)}
			</div>
		</header>
	);
}