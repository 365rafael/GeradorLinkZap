document.addEventListener("DOMContentLoaded", () => {
    const generateBtn = document.getElementById("generateBtn");
    const copyBtn = document.getElementById("copyBtn");
    const downloadQrBtn = document.getElementById("downloadQrBtn");
    const phoneInput = document.getElementById("phone");
  
    // Aplica a máscara no campo de telefone
    IMask(phoneInput, {
      mask: '+{00} (00) 00000-0000'
    });
  
    // Desativa o botão de download no início
    downloadQrBtn.disabled = true;
  
    generateBtn.addEventListener("click", gerarLink);
    copyBtn.addEventListener("click", copiarLink);
    downloadQrBtn.addEventListener("click", baixarQRCode);
  });
  
  let qrCodeInstance = null;
  
  function gerarLink() {
    const phoneField = document.getElementById('phone');
    const rawPhone = phoneField.value.replace(/\D/g, '');
    const message = encodeURIComponent(document.getElementById('message').value.trim());
    const outputDiv = document.getElementById('linkOutput');
    const linkEl = document.getElementById('whatsappLink');
    const qrCodeDiv = document.getElementById('qrcode');
    const downloadQrBtn = document.getElementById('downloadQrBtn');
  
    if (!rawPhone || rawPhone.length < 10) {
      alert("Digite um número de telefone válido.");
      downloadQrBtn.disabled = true;
      return;
    }
  
    const link = `https://wa.me/${rawPhone}?text=${message}`;
    linkEl.innerText = link;
    outputDiv.classList.remove('hidden');
  
    // Limpa QR anterior
    qrCodeDiv.innerHTML = "";
  
    // Gera novo QR Code
    qrCodeInstance = new QRCode(qrCodeDiv, {
      text: link,
      width: 180,
      height: 180,
      colorDark: "#000000",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.H
    });
  
    // Ativa o botão de download
    downloadQrBtn.disabled = false;
  }
  
  function copiarLink() {
    const link = document.getElementById('whatsappLink').innerText;
    navigator.clipboard.writeText(link).then(() => {
      alert("Link copiado com sucesso!");
    }).catch(() => {
      alert("Erro ao copiar o link.");
    });
  }
  
  function baixarQRCode() {
    const qrCanvas = document.querySelector("#qrcode canvas");
  
    if (!qrCanvas) {
      alert("Gere um QR Code primeiro.");
      return;
    }
  
    const imgData = qrCanvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = imgData;
    link.download = "qrcode_whatsapp.png";
    link.click();
  }
  