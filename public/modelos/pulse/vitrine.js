document.querySelectorAll(".site-preview").forEach(preview => {
  const resize = () => preview.style.setProperty("--preview-scale", preview.clientWidth / 1100);
  resize();
  if ("ResizeObserver" in window) new ResizeObserver(resize).observe(preview);
  else window.addEventListener("resize", resize);
});
const config = window.PERSONAL_CONFIG || {};
const number = String(config.whatsapp || "").replace(/\D/g, "");
if (/^[1-9]\d{9,14}$/.test(number)) {
  const cta = document.getElementById("contact-cta");
  cta.href = "https://wa.me/" + number + "?text=" + encodeURIComponent(config.mensagem || "Olá! Quero saber mais sobre os sites para personal.");
  cta.textContent = "Conversar sobre meu site ↗";
  cta.target = "_blank";
  cta.rel = "noopener noreferrer";
}
