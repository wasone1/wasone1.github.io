document.addEventListener("DOMContentLoaded", function () {

    /* =========================
       Card Fade + Stagger
    ========================= */

    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 });

    cards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 120}ms`;
        observer.observe(card);
    });


    /* =========================
       Language Switch
    ========================= */

    const langSwitch = document.getElementById("lang-switch");

    if (langSwitch) {
        const path = window.location.pathname.replace(/\/+$/, "");

        if (path.startsWith("/uk")) {
            const newPath = path.replace("/uk", "") || "/";
            langSwitch.href = newPath;
        } else {
            langSwitch.href = "/uk" + (path === "" ? "/" : path);
        }
    }


    /* =========================
       Active Navigation
    ========================= */

    const homeLink = document.querySelector('[data-nav="home"]');
    const appsLink = document.querySelector('[data-nav="apps"]');

    const cleanPath = window.location.pathname.replace(/\/+$/, "");

    if (
        cleanPath === "" ||
        cleanPath === "/" ||
        cleanPath === "/uk"
    ) {
        homeLink?.classList.add("active");
    }
    else if (
        cleanPath.startsWith("/apps") ||
        cleanPath.startsWith("/uk/apps")
    ) {
        appsLink?.classList.add("active");
    }

});