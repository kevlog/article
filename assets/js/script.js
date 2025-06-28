document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("to");

    if (!slug) {
        document.body.innerHTML = "<h2>Error: Parameter `to` tidak ditemukan di URL.</h2>";
        return;
    }

    fetch("assets/data/data.json")
        .then((res) => res.json())
        .then((data) => {
            const target = data[slug];
            if (target) {
                window.location.replace(target);
            } else {
                document.body.innerHTML = `<h2>Error: Link untuk "${slug}" tidak ditemukan.</h2>`;
            }
        })
        .catch((err) => {
            console.error("Gagal load redirects.json:", err);
            document.body.innerHTML = "<h2>Gagal mengambil data redirect.</h2>";
        });
});
