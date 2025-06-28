document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("to");
    const baseUrl = window.location.origin;
    const fullUrl = `${baseUrl}/${slug}`;

    function isValidSlug(slug) {
        return (
            typeof slug === "string" && // Pastikan slug berupa string
            slug.trim() !== "" && // Hindari string kosong/spasi
            slug.toLowerCase() !== "null" && // Tangkal ?to=null
            slug.toLowerCase() !== "undefined" // Tangkal ?to=undefined
        );
    }

    if (!isValidSlug(slug)) {
        document.body.innerHTML = "<p>Error: Parameter `to` tidak ditemukan di URL atau tidak valid.</p>";
        return;
    }

    fetch("assets/data/data.json")
        .then((res) => res.json())
        .then((data) => {
            const target = data[slug];
            if (target && target.title && target.url) {
                document.title = target.title;
                window.location.replace(target.url);
            } else {
                document.title = "Error: Link tidak ditemukan";
                document.body.innerHTML = `<p>Error: Link untuk "${fullUrl}" tidak ditemukan.</p>`;
            }
        })
        .catch((err) => {
            console.error("Gagal load data.json:", err);
            document.body.innerHTML = "<p>Gagal mengambil data redirect.</p>";
        });
});
