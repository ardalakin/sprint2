interface HeaderProps {
  title: string;
  text?: string;
}

export default function Header({ title, text }: HeaderProps) {
  return (
    <>
      <h1 className="site-heading">{title}</h1>
      {text && <p className="site-subtitle">{text}</p>}
    </>
  );
}
