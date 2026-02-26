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
    } else if (cleanPath.startsWith("/apps") || cleanPath.startsWith("/uk/apps")) {
        appsLink?.classList.add("active");
    }

    /* =========================================
       PRO LOOP SLIDER
    ========================================= */

    const track = document.getElementById("appsTrack");
    const dotsContainer = document.getElementById("appsDots");

    if (!track) return;

    const originalCards = Array.from(track.children);

    // Clone first & last
    const firstClone = originalCards[0].cloneNode(true);
    const lastClone = originalCards[originalCards.length - 1].cloneNode(true);

    track.appendChild(firstClone);
    track.insertBefore(lastClone, originalCards[0]);

    const cards = Array.from(track.children);

    let index = 1;

    function getCardWidth(i) {
        return cards[i].offsetWidth + 40;
    }

    function update(animate = true) {

        if (!animate) track.style.transition = "none";
        else track.style.transition = "transform 0.5s cubic-bezier(.16,1,.3,1)";

        const cardWidth = getCardWidth(index);
        track.style.transform =
            `translateX(calc(50% - ${cardWidth / 2}px - ${index * cardWidth}px))`;

        cards.forEach(c => c.classList.remove("active"));
        cards[index].classList.add("active");

        const realIndex = (index - 1 + originalCards.length) % originalCards.length;

        dotsContainer.querySelectorAll("button").forEach(b => b.classList.remove("active"));
        dotsContainer.children[realIndex]?.classList.add("active");
    }

    // Create dots
    originalCards.forEach((_, i) => {
        const dot = document.createElement("button");
        dot.addEventListener("click", () => {
            index = i + 1;
            update();
        });
        dotsContainer.appendChild(dot);
    });

    update(false);

    /* Drag logic */

    let startX = 0;
    let isDragging = false;

    track.addEventListener("pointerdown", (e) => {
        isDragging = true;
        startX = e.clientX;
        track.style.transition = "none";
    });

    window.addEventListener("pointerup", (e) => {
        if (!isDragging) return;
        isDragging = false;

        const diff = e.clientX - startX;

        if (diff > 80) index--;
        if (diff < -80) index++;

        if (index === 0) {
            index = originalCards.length;
            update(false);
        }

        if (index === cards.length - 1) {
            index = 1;
            update(false);
        }

        update();
    });

});