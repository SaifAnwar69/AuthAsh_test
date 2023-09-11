import Image from "next/image";
import { UilPhone } from "@iconscout/react-unicons";
import Cherry from "../assets/Cherry.png";
import HeroImage from "../assets/HeroImage.png";
import Pizza1 from "../assets/p1.jpg";
import styles from "../styles/Hero.module.css";



export default function Hero() {
	return (
		<div className={styles.hero}>
			{/* left side */}
			<div className={styles.leftSide}>
				{/* <div className={styles.cherryDiv}>
					<span>More than Faster</span>
					<Image src={Cherry} alt="Cherry" width={40} height={25} />
				</div> */}
				<div className={styles.heroText}>
					<span>ABOUT US </span>
					{/* <span>In Rolling</span>
					<span>
						Your <span style={{ color: "var(--themeRed)" }}>Joint</span>
					</span> */}
				</div>
				<span className={styles.miniText}>
				We are a kick ass brand trying to make it as the number 1 online smoke shop in Bangladesh. Our goal is to make smoking <span style={{ color: "var(--themeRed)" }}>EASY, RELIABLE AND AFFORDABLE</span>. 
				<p></p>
				All products are 100% Real and Authentic.
				<p></p>
					
					<br />
				</span>
				{/* <button className={`btn ${styles.btn}`}>Get Started</button> */}
			</div>
			{/* right side */}

			<div className={styles.rightSide}>
				{/* add carousel here */}

				{/* <div className={styles.imageContainer}>
					<Image src={HeroImage} alt="HeroImage" />
				</div> */}

				{/* <div className={styles.contactUs}>
					<span>Contact us</span>
					<div className={styles.phone}>
						<UilPhone />
					</div>
				</div> */}
				
				{/* <div className={styles.pizza}>
					<div className={styles.pizzaImg}>
						<Image src={Pizza1} alt="Pizza1" />
					</div>
					<div className={styles.details}>
						<span>Canadian Pizza</span>
						<span>
							<span style={{ color: "var(--themeRed)" }}>৳ </span> 7.45
						</span>
					</div>
				</div> */}
			</div>
		</div>
	);
}