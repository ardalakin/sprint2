import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const found: { email?: string; password?: string } = {};
    if (!email.includes("@")) found.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section aria-labelledby="login-title">
      <h2 className="page-title" id="login-title">Giriş Yap</h2>
      <p className="form-intro">Bu sprintte giriş ekranı doğrulama demosudur; bilgiler gönderilmez.</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="login-email">E-posta</label>
          <input id="login-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} />
          <span className="hata-metni">{errors.email}</span>
        </div>
        <div className="form-field">
          <label htmlFor="login-password">Şifre</label>
          <input id="login-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} />
          <span className="hata-metni">{errors.password}</span>
        </div>
        <button type="submit">Giriş Yap</button>
      </form>
      {sent && <p className="message message-success" role="status">Gerçek giriş Sprint 10'da eklenecek. Bu ekranda oturum açılmadı.</p>}
      <nav className="auth-links" aria-label="Hesap bağlantıları">
        <Link to="/forgot-password">Şifremi unuttum</Link>
        <Link to="/register">Kayıt ol</Link>
      </nav>
    </section>
  );
}
