import Image from "next/image";
import Link from "next/link";
import { UilFacebook, UilTwitter, UilInstagram } from "@iconscout/react-unicons";
import Logo from "../assets/Logo.png";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span>ALL RIGHTS RESERVED</span>
			<div className={styles.social}>
				{/* <UilFacebook size={45} />
				<UilTwitter size={45} /> */}
				<Link href="https://www.instagram.com/authenticash52/"><UilInstagram size={45} /></Link>

			</div>
			<div className={styles.logo}>
				<Link href="../"><Image src={Logo} alt="Logo" width={50} height={50} /></Link>
				<span>Autism</span>
			</div>
		</footer>
	);
}