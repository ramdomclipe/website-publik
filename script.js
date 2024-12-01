
document.addEventListener("DOMContentLoaded", function() {
    // Get the submit button
    const submitButton = document.getElementById("submit-btn");

    // Add event listener to the button
    submitButton.addEventListener("click", function() {
        // Get values from the input fields
        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();

        // Check if any field is empty
        if (name === "" || email === "" || message === "") {
            alert("Harap lengkapi semua kolom!");
            return;
        }

        // Validate email domain (only Gmail or Yahoo)
        const emailPattern = /^[a-zA-Z0-9._%+-]+@(gmail\.com|yahoo\.com)$/;
        if (!emailPattern.test(email)) {
            alert("Sepertinya ada data yang salah saat mengirim. Pastikan email menggunakan domain @gmail.com atau @yahoo.com");
            return;
        }

        // If all fields are filled and the email is valid, show success message
        alert("Pesan Telah Terkirim");

        // Optionally, reset the form after submission
        document.getElementById("contact-form").reset();
    });
});
