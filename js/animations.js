document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // Card fade-in animation
    // =========================
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));


    // =========================
    // Language switcher
    // =========================
    const langSwitch = document.getElementById("lang-switch");

    if (langSwitch) {
        const path = window.location.pathname.replace(/\/+$/, "");

        if (path.startsWith("/uk")) {
            // UA → EN
            const newPath = path.replace("/uk", "") || "/";
            langSwitch.href = newPath;
        } else {
            // EN → UA
            langSwitch.href = "/uk" + (path === "" ? "/" : path);
        }
    }


    // =========================
    // Active navigation
    // =========================
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