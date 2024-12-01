<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Ambil data dari form
    $name = htmlspecialchars($_POST['name']);
    $email = htmlspecialchars($_POST['email']);
    $message = htmlspecialchars($_POST['message']);

    // Validasi form input
    if (!empty($name) && !empty($email) && !empty($message)) {
        // Email tujuan
        $to = "youremail@example.com"; // Ganti dengan email tujuan
        $subject = "Pesan Baru dari Kontak Website";

        // Isi email
        $email_content = "
        Nama: $name\n
        Email: $email\n
        Pesan:\n$message
        ";

        // Header email
        $headers = "From: $email";

        // Kirim email
        if (mail($to, $subject, $email_content, $headers)) {
            echo "<script>alert('Pesan Anda berhasil dikirim!'); window.location.href = 'index.html';</script>";
        } else {
            echo "<script>alert('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'); window.location.href = 'index.html';</script>";
        }
    } else {
        echo "<script>alert('Semua kolom harus diisi!'); window.location.href = 'index.html';</script>";
    }
} else {
    // Jika tidak POST, kembalikan ke halaman utama
    header("Location: index.html");
    exit();
}
?>
