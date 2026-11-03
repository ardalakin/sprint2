import { useState, type FormEvent } from "react";
import { Link } from "react-router-dom";

interface RegisterErrors {
  name?: string;
  email?: string;
  password?: string;
  password2?: string;
}

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errors, setErrors] = useState<RegisterErrors>({});
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    const found: RegisterErrors = {};
    if (name.trim().length < 3) found.name = "Ad soyad en az 3 karakter olmalı.";
    if (!email.includes("@")) found.email = "Geçerli bir e-posta adresi girin.";
    if (password.length < 6) found.password = "Şifre en az 6 karakter olmalı.";
    if (password2 !== password) found.password2 = "Şifreler aynı değil.";
    setErrors(found);
    setSent(Object.keys(found).length === 0);
  }

  return (
    <section aria-labelledby="register-title">
      <h2 className="page-title" id="register-title">Kayıt Ol</h2>
      <p className="form-intro">Bu sprintte kayıt ekranı doğrulama demosudur; hesap oluşturulmaz.</p>
      <form className="form" onSubmit={handleSubmit} noValidate>
        <div className="form-field">
          <label htmlFor="register-name">Ad Soyad</label>
          <input id="register-name" type="text" value={name} onChange={(e) => setName(e.target.value)} aria-invalid={Boolean(errors.name)} />
          <span className="hata-metni">{errors.name}</span>
        </div>
        <div className="form-field">
          <label htmlFor="register-email">E-posta</label>
          <input id="register-email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} aria-invalid={Boolean(errors.email)} />
          <span className="hata-metni">{errors.email}</span>
        </div>
        <div className="form-field">
          <label htmlFor="register-password">Şifre</label>
          <input id="register-password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} aria-invalid={Boolean(errors.password)} />
          <span className="hata-metni">{errors.password}</span>
        </div>
        <div className="form-field">
          <label htmlFor="register-password2">Şifre (tekrar)</label>
          <input id="register-password2" type="password" value={password2} onChange={(e) => setPassword2(e.target.value)} aria-invalid={Boolean(errors.password2)} />
          <span className="hata-metni">{errors.password2}</span>
        </div>
        <button type="submit">Kayıt Ol</button>
      </form>
      {sent && <p className="message message-success" role="status">Bu sprintte gerçek hesap oluşturulmaz.</p>}
      <p className="auth-links"><Link to="/login">Zaten hesabın var mı? Giriş yap</Link></p>
    </section>
  );
}
