document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       Reveal Animation
    ========================================= */

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

    /* =========================================
       Language Switch
    ========================================= */

    const langSwitch = document.getElementById("lang-switch");
    if (langSwitch) {
        const path = window.location.pathname.replace(/\/+$/, "");
        if (path.startsWith("/uk")) {
            langSwitch.href = path.replace("/uk", "") || "/";
        } else {
            langSwitch.href = "/uk" + (path === "" ? "/" : path);
        }
    }

    /* =========================================
       Active Navigation
    ========================================= */

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

    /* =========================================
       Apps Scroll Logic
    ========================================= */

    const row = document.getElementById("appsRow");
    if (!row) return;

    const cards = Array.from(row.querySelectorAll(".app-card"));
    const dotsContainer = document.getElementById("appsDots");

    /* Expand logic */

    function setActive(card) {
        cards.forEach(c => c.classList.remove("active"));
        card.classList.add("active");
    }

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            if (window.matchMedia("(hover: hover)").matches) {
                setActive(card);
            }
        });

        card.addEventListener("click", () => {
            setActive(card);
        });
    });

    /* Drag scroll */

    let isDown = false;
    let startX;
    let scrollLeft;

    row.addEventListener("mousedown", (e) => {
        isDown = true;
        row.classList.add("dragging");
        startX = e.pageX - row.offsetLeft;
        scrollLeft = row.scrollLeft;
    });

    window.addEventListener("mouseup", () => {
        isDown = false;
        row.classList.remove("dragging");
    });

    row.addEventListener("mousemove", (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - row.offsetLeft;
        const walk = (x - startX) * 1.2;
        row.scrollLeft = scrollLeft - walk;
    });

    /* Touch */

    row.addEventListener("touchstart", (e) => {
        startX = e.touches[0].pageX;
        scrollLeft = row.scrollLeft;
    });

    row.addEventListener("touchmove", (e) => {
        const x = e.touches[0].pageX;
        const walk = (x - startX) * 1.2;
        row.scrollLeft = scrollLeft - walk;
    });

    /* Dots */

    cards.forEach((card, i) => {
        const btn = document.createElement("button");
        if (i === 0) btn.classList.add("active");

        btn.addEventListener("click", () => {
            card.scrollIntoView({ behavior: "smooth", inline: "center" });
        });

        dotsContainer.appendChild(btn);
    });

    /* Update dots */

    row.addEventListener("scroll", () => {

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, i) => {
            const rect = card.getBoundingClientRect();
            const distance = Math.abs(window.innerWidth / 2 - rect.left - rect.width / 2);
            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = i;
            }
        });

        dotsContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        dotsContainer.children[closestIndex]?.classList.add("active");
    });

});