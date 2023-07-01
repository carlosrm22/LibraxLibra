const form = document.getElementById('claseForm');

const setMinDateAndTime = () => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const minDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    document.getElementById('fecha').min = minDateTime;
};

const sendMessageToWhatsApp = (fecha) => {
    const phoneNumber = '525522671215';
    const message = `Hola, quiero apartar una clase muestra para el ${fecha}.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappURL = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappURL, '_blank');
};

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const fechaInput = document.getElementById('fecha');
    const fecha = fechaInput.value;
    const minDateTime = fechaInput.min;

    if (!fecha || fecha < minDateTime) {
        Swal.fire({
            icon: 'warning',
            title: 'Oops...',
            text: 'Por favor, selecciona una fecha y hora válida para tu clase.',
        });
        return;
    }

    console.log('Fecha y hora seleccionada:', fecha);

    // Envía la información a través de WhatsApp
    sendMessageToWhatsApp(fecha);

    Swal.fire({
        icon: 'success',
        title: '¡Clase apartada con éxito!',
        text: `Tu clase ha sido apartada con éxito. Fecha y hora: ${fecha}`,
    });
});

// Establece la fecha y hora mínimas al cargar la página
setMinDateAndTime();
