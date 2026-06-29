async function vsShorten() {

    const url = document.getElementById("vs-url").value;

    const api =
        "/yourls-api.php?format=json&action=shorturl&url=" +
        encodeURIComponent(url);

    const res = await fetch(api);
    const data = await res.json();

    if (data.shorturl) {

        document.getElementById("vs-result").style.display = "block";
        document.getElementById("vs-shorturl").value = data.shorturl;

        const qr = document.getElementById("vs-qrcode");
        qr.innerHTML = "";
        new QRCode(qr, data.shorturl);
    }
}

function vsCopy() {
    const el = document.getElementById("vs-shorturl");
    el.select();
    document.execCommand("copy");
    alert("Gekopieerd!");
}
