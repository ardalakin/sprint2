import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const found = email.includes("@") ? "" : "Geçerli bir e-posta girin.";
    setError(found);
    setSent(found === "");
  }

  return (
    <section aria-labelledby="forgot-title">
      <h2 className="page-title bolum-baslik" id="forgot-title">Şifremi Unuttum</h2>
      <p className="form-intro">Şifre yenileme bağlantısı için e-posta adresinizi girin.</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="forgot-email">E-posta</label>
          <input id="forgot-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(error)} />
          <span className="hata-metni">{error}</span>
        </div>
        <button type="submit">Bağlantı gönder</button>
      </form>
      {sent && <p className="message message-success mesaj mesaj-basari" role="status">Bağlantı {email} adresine gönderildi (demo).</p>}
      <p className="auth-links"><Link to="/login">← Girişe dön</Link></p>
    </section>
  );
}
