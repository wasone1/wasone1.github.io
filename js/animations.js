document.addEventListener("DOMContentLoaded", () => {

	/* 1. REVEAL ANIMATION */
	const observerOptions = { threshold: 0.1 };

	const observer = new IntersectionObserver((entries, obs) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				entry.target.classList.add("visible");
				obs.unobserve(entry.target);
			}
		});
	}, observerOptions);

	document.querySelectorAll(".card, .stack, .hero").forEach((el, i) => {
		el.style.transitionDelay = `${i * 50}ms`;
		observer.observe(el);
	});

	/* 2. SLIDER LOGIC + DOTS */
	const row = document.getElementById("appsRow");
	const cards = document.querySelectorAll(".app-card");
	const dotsContainer = document.getElementById("appsDots");

	if (row && cards.length > 0) {

		// A. Generate Dots
		if (dotsContainer) {
			dotsContainer.innerHTML = "";
			cards.forEach((_, index) => {
				const dot = document.createElement("button");
				dot.classList.add("dot-btn");
				if (index === 0) dot.classList.add("active");

				// Click dot -> scroll to card
				dot.addEventListener("click", () => {
					cards[index].click(); // Activate card logic
				});

				dotsContainer.appendChild(dot);
			});
		}

		// B. Update Dots on Scroll
		const updateActiveDot = (index) => {
			const dots = document.querySelectorAll(".dot-btn");
			dots.forEach(d => d.classList.remove("active"));
			if (dots[index]) dots[index].classList.add("active");
		};

		row.addEventListener("scroll", () => {
			let center = row.scrollLeft + (row.offsetWidth / 2);
			let closestIndex = 0;
			let closestDist = Infinity;

			cards.forEach((card, i) => {
				let cardCenter = card.offsetLeft + (card.offsetWidth / 2);
				let dist = Math.abs(center - cardCenter);
				if (dist < closestDist) {
					closestDist = dist;
					closestIndex = i;
				}
			});
			updateActiveDot(closestIndex);
		});

		// C. Card Click Logic
		cards.forEach((card, index) => {
			card.addEventListener("click", () => {
				if (card.classList.contains('active')) return;

				cards.forEach(c => c.classList.remove("active"));
				card.classList.add("active");
				updateActiveDot(index);

				setTimeout(() => {
					card.scrollIntoView({
						behavior: "smooth",
						inline: "center",
						block: "nearest"
					});
				}, 300);
			});
		});

		// D. Mouse Wheel Scroll (Optional)
		row.addEventListener("wheel", (evt) => {
			if (evt.deltaY !== 0) {
				evt.preventDefault();
				row.scrollLeft += evt.deltaY;
			}
		});
	}

	/* 3. LANG SWITCH */
	const langSwitch = document.getElementById("lang-switch");
	if (langSwitch) {
		// Standard logic
	}
});