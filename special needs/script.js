const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-navigation");

if (menuToggle && navigation) {
    const mobileViewport = window.matchMedia("(max-width: 640px)");

    const setMenuOpen = (isOpen) => {
        menuToggle.setAttribute("aria-expanded", String(isOpen));
        menuToggle.setAttribute(
            "aria-label",
            isOpen ? "Close navigation menu" : "Open navigation menu"
        );
        navigation.classList.toggle("is-open", isOpen);
    };

    menuToggle.addEventListener("click", () => {
        const isExpanded = menuToggle.getAttribute("aria-expanded") === "true";
        setMenuOpen(!isExpanded);
    });

    navigation.addEventListener("click", (event) => {
        if (event.target instanceof Element && event.target.closest("a")) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("click", (event) => {
        if (
            menuToggle.getAttribute("aria-expanded") === "true" &&
            event.target instanceof Node &&
            !navigation.contains(event.target) &&
            !menuToggle.contains(event.target)
        ) {
            setMenuOpen(false);
        }
    });

    document.addEventListener("keydown", (event) => {
        if (
            event.key === "Escape" &&
            menuToggle.getAttribute("aria-expanded") === "true"
        ) {
            setMenuOpen(false);
            menuToggle.focus();
        }
    });

    mobileViewport.addEventListener("change", (event) => {
        if (!event.matches) {
            setMenuOpen(false);
        }
    });
}
