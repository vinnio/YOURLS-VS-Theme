function vsToast(message, type = "success") {
    let toast = document.createElement("div");
    toast.className = "vs-toast " + type;
    toast.innerText = message;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.add("show");
    }, 10);

    setTimeout(() => {
        toast.classList.remove("show");
        setTimeout(() => toast.remove(), 300);
    }, 2500);
}

async function vsShorten() {

    const input = document.getElementById("vs-url");
    const url = input.value.trim();

    if (!url) {
        vsToast("Voer een URL in", "error");
        return;
    }

    const btn = document.querySelector("button");
    btn.disabled = true;
    btn.innerText = "Bezig...";

    try {
        const api =
            "/yourls-api.php?format=json&action=shorturl&url=" +
            encodeURIComponent(url);

        const res = await fetch(api);
        const data = await res.json();

        if (!data.shorturl) {
            throw new Error(data.message || "Kon URL niet verkorten");
        }

        document.getElementById("vs-result").style.display = "block";
        document.getElementById("vs-shorturl").value = data.shorturl;

        const qr = document.getElementById("vs-qrcode");
        qr.innerHTML = "";
        new QRCode(qr, data.shorturl);

        vsToast("Link aangemaakt!");

    } catch (e) {
        vsToast(e.message, "error");
    }

    btn.disabled = false;
    btn.innerText = "Verkorten";
}

function vsCopy() {
    const el = document.getElementById("vs-shorturl");
    el.select();
    document.execCommand("copy");
    vsToast("Gekopieerd!");
}

// Enter key support
document.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("vs-url");

    input.addEventListener("keydown", function(e) {
        if (e.key === "Enter") {
            vsShorten();
        }
    });
});
