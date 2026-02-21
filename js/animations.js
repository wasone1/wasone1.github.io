document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       Reveal Animation (IntersectionObserver)
    ========================================= */

    const cards = document.querySelectorAll(".card");

    if ("IntersectionObserver" in window) {

        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15 });

        cards.forEach((card, index) => {
            card.style.transitionDelay = `${index * 100}ms`;
            observer.observe(card);
        });

    } else {
        // Fallback
        cards.forEach(card => card.classList.add("visible"));
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

});