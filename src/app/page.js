
import Header from "../components/Header";

export default function Home() {
  return (
    <main className="min-h-screen bg-white text-black">
      <Header />

      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="flex min-h-[350px] flex-col items-center justify-center bg-gray-100 px-6 text-center">
          <p className="mb-4 text-sm tracking-[0.3em]">
            НОВИЙ СЕЗОН
          </p>

          <h1 className="mb-6 text-4xl font-semibold md:text-6xl">
            Твій стиль. Твої правила.
          </h1>

          <p className="mb-8 max-w-xl text-gray-600">
            Відкривай нові колекції одягу, взуття та аксесуарів.
          </p>

          <button className="bg-black px-8 py-4 text-sm text-white transition-colors hover:bg-gray-800">
            ПЕРЕГЛЯНУТИ КОЛЕКЦІЮ
          </button>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">
        <h2 className="mb-8 text-2xl font-semibold">
          ПОПУЛЯРНІ КАТЕГОРІЇ
        </h2>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
          {[
            "Жіночий одяг",
            "Чоловічий одяг",
            "Взуття та кросівки",
            "Спортивний одяг",
            "Сумки та аксесуари",
            "Дитячий одяг",
          ].map((category) => (
            <div
              key={category}
              className="flex min-h-36 items-center justify-center border border-gray-200 p-6 text-center text-lg transition-colors hover:bg-gray-100"
            >
              {category}
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-gray-200 px-6 py-8 text-center text-sm text-gray-500">
        ANSWEAR — твій простір стилю
      </footer>
    </main>
  );
}