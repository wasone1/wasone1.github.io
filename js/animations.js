document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       Reveal Animation
    ========================= */

    const revealCards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        revealCards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });
    } else {
        revealCards.forEach(card => card.classList.add("visible"));
    }

    /* =========================
       Navigation + Lang
    ========================= */

    const langSwitch = document.getElementById("lang-switch");
    if (langSwitch) {
        const path = window.location.pathname.replace(/\/+$/, "");
        if (path.startsWith("/uk")) {
            langSwitch.href = path.replace("/uk", "") || "/";
        } else {
            langSwitch.href = "/uk" + (path === "" ? "/" : path);
        }
    }

    const homeLink = document.querySelector('[data-nav="home"]');
    const appsLink = document.querySelector('[data-nav="apps"]');
    const cleanPath = window.location.pathname.replace(/\/+$/, "");

    if (cleanPath === "" || cleanPath === "/" || cleanPath === "/uk") {
        homeLink?.classList.add("active");
    } else if (
        cleanPath.startsWith("/apps") ||
        cleanPath.startsWith("/uk/apps")
    ) {
        appsLink?.classList.add("active");
    }

    /* =========================
       CAROUSEL LOGIC
    ========================= */

    const row = document.getElementById("appsRow");
    if (!row) return;

    const cards = Array.from(row.querySelectorAll(".app-card"));
    const dotsContainer = document.getElementById("appsDots");

    let index = 0;

    function updateCarousel() {

        cards.forEach(c => c.classList.remove("active"));
        cards[index].classList.add("active");

        const cardWidth = cards[index].offsetWidth + 28;
        const offset = index * cardWidth;

        row.style.transform = `translateX(${-offset}px)`;

        updateDots();
    }

    function updateDots() {
        dotsContainer.querySelectorAll("button")
            .forEach(b => b.classList.remove("active"));
        dotsContainer.children[index]?.classList.add("active");
    }

    /* Dots */

    cards.forEach((_, i) => {
        const btn = document.createElement("button");
        if (i === 0) btn.classList.add("active");
        btn.addEventListener("click", () => {
            index = i;
            updateCarousel();
        });
        dotsContainer.appendChild(btn);
    });

    /* Click card */

    cards.forEach((card, i) => {
        card.addEventListener("click", () => {
            index = i;
            updateCarousel();
        });
    });

    /* Loop via arrows (if added) */

    const leftArrow = document.querySelector(".carousel-arrow.left");
    const rightArrow = document.querySelector(".carousel-arrow.right");

    leftArrow?.addEventListener("click", () => {
        index = (index - 1 + cards.length) % cards.length;
        updateCarousel();
    });

    rightArrow?.addEventListener("click", () => {
        index = (index + 1) % cards.length;
        updateCarousel();
    });

    updateCarousel();
});