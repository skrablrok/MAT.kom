// Cookie consent: Google Maps (third-party cookies) loads only after the visitor accepts.
// Maps iframes use data-cookie-src instead of src; footer links with data-cookie-settings reopen the banner.

(function () {
    const STORAGE_KEY = "matkom_cookie_consent";
    const MAX_AGE_DAYS = 365;

    // Resolve links relative to this script so they also work from 404.html served at a nested URL.
    const base = document.currentScript ? new URL(".", document.currentScript.src).href : "";
    const page = location.pathname.split("/").pop();
    const lang = /_EN\.html$/i.test(page) ? "en" : /_IT\.html$/i.test(page) ? "it" : "sl";

    const texts = {
        sl: {
            title: "Piškotki",
            body: "Spletna stran uporablja nujno potrebne piškotke za delovanje. Z vašo privolitvijo prikažemo tudi Google Zemljevide, ki nastavljajo piškotke tretjih oseb.",
            more: "Več o piškotkih",
            policy: "piskotki.html",
            accept: "Sprejmi vse",
            reject: "Samo nujni",
            mapText: "Za prikaz zemljevida dovolite piškotke Google.",
            mapButton: "Prikaži zemljevid"
        },
        en: {
            title: "Cookies",
            body: "This website uses strictly necessary cookies to work. With your consent, we also show Google Maps, which sets third-party cookies.",
            more: "Cookie policy",
            policy: "piskotki_EN.html",
            accept: "Accept all",
            reject: "Necessary only",
            mapText: "Allow Google cookies to show the map.",
            mapButton: "Show map"
        },
        it: {
            title: "Cookie",
            body: "Questo sito utilizza cookie strettamente necessari al funzionamento. Con il vostro consenso mostriamo anche Google Maps, che imposta cookie di terze parti.",
            more: "Informativa sui cookie",
            policy: "piskotki_IT.html",
            accept: "Accetta tutti",
            reject: "Solo necessari",
            mapText: "Consentite i cookie Google per vedere la mappa.",
            mapButton: "Mostra mappa"
        }
    };
    const t = texts[lang];

    function readConsent() {
        try {
            const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
            if (!saved || Date.now() - saved.date > MAX_AGE_DAYS * 864e5) return null;
            return saved.value;
        } catch (e) {
            return null;
        }
    }

    function saveConsent(value) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify({ value: value, date: Date.now() }));
        } catch (e) { /* storage blocked: consent lasts for this page view only */ }
    }

    function loadMaps() {
        document.querySelectorAll("iframe[data-cookie-src]").forEach(frame => {
            const placeholder = frame.previousElementSibling;
            if (placeholder && placeholder.classList.contains("cookie-map-placeholder")) placeholder.remove();
            frame.src = frame.dataset.cookieSrc;
            frame.removeAttribute("data-cookie-src");
            frame.style.display = "";
        });
    }

    function blockMaps() {
        document.querySelectorAll("iframe[data-cookie-src]").forEach(frame => {
            if (frame.previousElementSibling && frame.previousElementSibling.classList.contains("cookie-map-placeholder")) return;
            const placeholder = document.createElement("div");
            placeholder.className = "cookie-map-placeholder";
            placeholder.style.width = /%$/.test(frame.width) ? frame.width : frame.width + "px";
            placeholder.style.height = frame.height + "px";
            placeholder.innerHTML = `<p>${t.mapText}</p><button type="button">${t.mapButton}</button>`;
            placeholder.querySelector("button").addEventListener("click", () => accept());
            frame.style.display = "none";
            frame.before(placeholder);
        });
    }

    function accept() {
        saveConsent("all");
        hideBanner();
        loadMaps();
    }

    function reject() {
        const hadMaps = readConsent() === "all";
        saveConsent("necessary");
        hideBanner();
        // Already-loaded maps may have set cookies; reload so they are no longer embedded.
        if (hadMaps) location.reload();
    }

    let banner;
    function showBanner() {
        if (!banner) {
            banner = document.createElement("div");
            banner.className = "cookie-banner";
            banner.setAttribute("role", "dialog");
            banner.setAttribute("aria-label", t.title);
            banner.innerHTML = `
                <div class="cookie-banner-text">
                    <h3>${t.title}</h3>
                    <p>${t.body} <a href="${base + t.policy}">${t.more}</a></p>
                </div>
                <div class="cookie-banner-buttons">
                    <button type="button" class="cookie-reject">${t.reject}</button>
                    <button type="button" class="cookie-accept">${t.accept}</button>
                </div>`;
            banner.querySelector(".cookie-accept").addEventListener("click", accept);
            banner.querySelector(".cookie-reject").addEventListener("click", reject);
            document.body.appendChild(banner);
        }
        banner.hidden = false;
        banner.querySelector(".cookie-accept").focus();
    }

    function hideBanner() {
        if (banner) banner.hidden = true;
    }

    function init() {
        document.querySelectorAll("[data-cookie-settings]").forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                showBanner();
            });
        });

        const consent = readConsent();
        if (consent === "all") {
            loadMaps();
        } else {
            blockMaps();
            if (consent === null) showBanner();
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", init);
    } else {
        init();
    }
})();
