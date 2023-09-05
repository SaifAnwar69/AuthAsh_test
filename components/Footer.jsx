import Image from "next/image";
import { UilFacebook, UilTwitter, UilInstagram } from "@iconscout/react-unicons";
import Logo from "../assets/Logo.png";
import styles from "../styles/Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<span>ALL RIGHTS RESERVED</span>
			<div className={styles.social}>
				<UilFacebook size={45} />
				<UilTwitter size={45} />
				<UilInstagram size={45} />
			</div>
			<div className={styles.logo}>
				<Image src={Logo} alt="Logo" width={50} height={50} />
				<span>Autism</span>
			</div>
		</footer>
	);
}