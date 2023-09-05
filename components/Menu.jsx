import Image from "next/image";
import Link from "next/link";
import { urlFor } from "../lib/client";
import styles from "../styles/Menu.module.css";

export default function Menu({ pizzas }) {
	return (
		<div className={styles.menu}>
			<div className={styles.heading}>
				<span>OUR MENU</span>
				<span>Menu That Always</span>
				<span>Make you Fall In pnq</span>
			</div>
			{/* pizzas */}
			<div className={styles.container}>
				{pizzas.map((pizza, id) => {
					const src = urlFor(pizza.image).url();
					return (
						<div className={styles.pizza} key={id}>
							<Link href={`./pizza/${pizza.slug.current}`}>
								<div className={styles.ImageWrapper}>
									<Image
										loader={() => src}
										src={src}
										alt={pizza.name}
										objectFit="cover"
										layout="fill"
										width="200"
										height="200"
									/>
								</div>
							</Link>

							<span>{pizza.name}</span>
							<span>
								<span style={{ color: "var(--themeRed)" }}>৳.</span>{" "}
								{pizza.price[0]}
							</span>
						</div>
					);
				})}
			</div>
		</div>
	);
}