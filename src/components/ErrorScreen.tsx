import "./errors.css";

type Props = {
  code: number;
  title: string;
  lead: string;
  children?: React.ReactNode; // кнопки дій
};

export default function ErrorScreen({ code, title, lead, children }: Props) {
  return (
    <section className="err container">
      <p className="err-code" aria-hidden="true">{code}</p>
      <div className="err-body">
        <h1>
          <span className="sr-only">{code}. </span>
          {title}
        </h1>
        <p className="err-lead">{lead}</p>
        <div className="err-actions">{children}</div>
      </div>
    </section>
  );
}
