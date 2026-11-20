"use client";

export default function DeleteButton({
  action,
  confirmText,
}: {
  action: () => Promise<void>;
  confirmText: string;
}) {
  return (
    <form
      action={action}
      onSubmit={(e) => {
        if (!window.confirm(confirmText)) e.preventDefault();
      }}
    >
      <button type="submit" className="adm-btn small danger">Видалити</button>
    </form>
  );
}
