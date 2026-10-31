
const categories = [
  {
    name: "ЖІНОЧИЙ ОДЯГ",
    items: ["Сукні", "Футболки", "Джинси", "Сорочки", "Куртки", "Светри"],
  },
  {
    name: "ЧОЛОВІЧИЙ ОДЯГ",
    items: ["Футболки", "Сорочки", "Джинси", "Штани", "Куртки", "Худі"],
  },
  {
    name: "ВЗУТТЯ",
    items: ["Кросівки", "Черевики", "Туфлі", "Сандалі", "Чоботи"],
  },
  {
    name: "СПОРТИВНИЙ ОДЯГ",
    items: ["Спортивні костюми", "Легінси", "Худі", "Шорти"],
  },
  {
    name: "СУМКИ ТА АКСЕСУАРИ",
    items: ["Сумки", "Рюкзаки", "Гаманці", "Ремені", "Головні убори"],
  },
  {
    name: "ДИТЯЧИЙ ОДЯГ",
    items: ["Футболки", "Штани", "Куртки", "Взуття"],
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white px-6 py-12 text-black">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-3 text-3xl font-semibold">
          КАТЕГОРІЇ
        </h1>

        <p className="mb-10 text-gray-500">
          Обирай одяг, взуття та аксесуари для свого стилю.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.name}
              className="border border-gray-200 p-6 transition-colors hover:bg-gray-50"
            >
              <h2 className="mb-5 text-xl font-semibold">
                {category.name}
              </h2>

              <ul className="flex flex-col gap-3">
                {category.items.map((item) => (
                  <li
                    key={item}
                    className="cursor-pointer text-sm text-gray-600 hover:text-black"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
