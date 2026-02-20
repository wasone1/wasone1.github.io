document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll(".card");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }
        });
    }, { threshold: 0.15 });

    cards.forEach(card => observer.observe(card));

    });

// Language switcher
document.addEventListener("DOMContentLoaded", function() {

    const langSwitch = document.getElementById("lang-switch");
    if (!langSwitch) return;

    const path = window.location.pathname;

    if (path.startsWith("/uk/")) {
        // UA → EN
        langSwitch.href = path.replace("/uk", "") || "/";
    } else {
        // EN → UA
        langSwitch.href = "/uk" + path;
    }

});
