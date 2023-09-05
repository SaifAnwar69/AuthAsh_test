import Image from "next/image";
import Services1 from "../assets/s1.png";
import Services2 from "../assets/s2.png";
import Services3 from "../assets/s3.png";
import styles from "../styles/Services.module.css";

export default function Services() {
	return (
		<div className={styles.services}>
			<div className={styles.heading}>
				<span>WHAT WE SERVE</span>
				<span>Your Favourite Paper</span>
				<span>Delivery Partner</span>
			</div>
			{/* features */}
			<div className={styles.container}>
				<div className={styles.feature}>
					<div className={styles.imageWrapper}>
						<Image src={Services1} alt="Services1" />
					</div>
					<span>Easy to Order</span>
					<span>You only need a few steps in ordering</span>
				</div>

				<div className={styles.feature}>
					<div className={styles.imageWrapper}>
						<Image src={Services2} alt="Services2" />
					</div>
					<span>Easy to Order</span>
					<span>Delivery that is always safe</span>
				</div>

				<div className={styles.feature}>
					<div className={styles.imageWrapper}>
						<Image src={Services3} alt="Services3" />
					</div>
					<span>Easy to Order</span>
					<span>Not only fast for us, quality is also number one</span>
				</div>
			</div>
		</div>
	);
}