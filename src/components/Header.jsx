
"use client";

import { useState } from "react";

const categories = [
  {
    name: "ЖІНКАМ",
    columns: [
      {
        title: "ОДЯГ",
        items: ["Футболки", "Сукні", "Джинси", "Куртки"],
      },
      {
        title: "ВЗУТТЯ",
        items: ["Кросівки", "Черевики", "Туфлі", "Сандалі"],
      },
      {
        title: "АКСЕСУАРИ",
        items: ["Сумки", "Рюкзаки", "Окуляри", "Гаманці"],
      },
    ],
  },
  {
    name: "ЧОЛОВІКАМ",
    columns: [
      {
        title: "ОДЯГ",
        items: ["Футболки", "Сорочки", "Джинси", "Куртки"],
      },
      {
        title: "ВЗУТТЯ",
        items: ["Кросівки", "Черевики", "Туфлі", "Сандалі"],
      },
      {
        title: "АКСЕСУАРИ",
        items: ["Рюкзаки", "Гаманці", "Ремені", "Годинники"],
      },
    ],
  },
  {
    name: "ДІТЯМ",
    columns: [
      {
        title: "ОДЯГ",
        items: ["Футболки", "Светри", "Джинси", "Куртки"],
      },
      {
        title: "ВЗУТТЯ",
        items: ["Кросівки", "Черевики", "Сандалі"],
      },
      {
        title: "ІНШЕ",
        items: ["Рюкзаки", "Аксесуари", "Спортивний одяг"],
      },
    ],
  },
  {
    name: "ВЗУТТЯ",
    columns: [
      {
        title: "ЖІНОЧЕ",
        items: ["Кросівки", "Туфлі", "Черевики", "Сандалі"],
      },
      {
        title: "ЧОЛОВІЧЕ",
        items: ["Кросівки", "Черевики", "Лофери", "Туфлі"],
      },
      {
        title: "ПОПУЛЯРНЕ",
        items: ["Спортивне взуття", "Повсякденне взуття", "Новинки"],
      },
    ],
  },
  {
    name: "СПОРТ",
    columns: [
      {
        title: "ОДЯГ",
        items: ["Футболки", "Худі", "Легінси", "Спортивні штани"],
      },
      {
        title: "ВЗУТТЯ",
        items: ["Бігові кросівки", "Тренувальні кросівки", "Кеди"],
      },
      {
        title: "КОЛЕКЦІЇ",
        items: ["Для тренувань", "Для бігу", "Для відпочинку"],
      },
    ],
  },
  {
    name: "АКСЕСУАРИ",
    columns: [
      {
        title: "СУМКИ",
        items: ["Рюкзаки", "Сумки через плече", "Шопери"],
      },
      {
        title: "АКСЕСУАРИ",
        items: ["Окуляри", "Гаманці", "Ремені", "Головні убори"],
      },
      {
        title: "ІНШЕ",
        items: ["Годинники", "Прикраси", "Шарфи"],
      },
    ],
  },
];

export default function Header() {
  const [activeCategory, setActiveCategory] = useState(null);

  return (
    <header className="relative border-b border-gray-200 bg-white">
      <div className="bg-black px-4 py-2 text-center text-xs text-white">
        НОВА КОЛЕКЦІЯ ВЖЕ НА САЙТІ
      </div>

      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6">
        <button
          onClick={() =>
            setActiveCategory(activeCategory === "МЕНЮ" ? null : "МЕНЮ")
          }
          className="text-sm hover:text-gray-500"
        >
          ☰ МЕНЮ
        </button>

        <a href="/" className="text-2xl font-bold tracking-[0.2em] sm:text-3xl">
          ANSWEAR
        </a>

        <div className="flex gap-4 text-lg">
          <button aria-label="Пошук" className="hover:text-gray-500">
            ⌕
          </button>
          <button aria-label="Обране" className="hover:text-gray-500">
            ♡
          </button>
          <button aria-label="Кошик" className="hover:text-gray-500">
            🛍
          </button>
        </div>
      </div>

      <nav className="mx-auto flex max-w-7xl flex-wrap justify-center gap-x-8 gap-y-3 px-4 pb-5">
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() =>
              setActiveCategory(
                activeCategory === category.name ? null : category.name
              )
            }
            className={`border-b-2 pb-1 text-sm transition-colors hover:border-black ${
              activeCategory === category.name
                ? "border-black"
                : "border-transparent"
            }`}
          >
            {category.name}
          </button>
        ))}
      </nav>

      {activeCategory && (
        <div className="absolute left-0 top-full z-50 w-full border-t border-gray-200 bg-white shadow-lg">
          <div className="mx-auto max-w-7xl px-6 py-8">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {activeCategory === "МЕНЮ" ? "УСІ КАТЕГОРІЇ" : activeCategory}
              </h2>

              <button
                onClick={() => setActiveCategory(null)}
                className="text-3xl text-gray-500 hover:text-black"
                aria-label="Закрити меню"
              >
                ×
              </button>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
              {(activeCategory === "МЕНЮ"
                ? categories
                : categories.filter(
                    (category) => category.name === activeCategory
                  )
              ).map((category) => (
                <div key={category.name}>
                  {activeCategory === "МЕНЮ" && (
                    <h3 className="mb-4 font-semibold">{category.name}</h3>
                  )}

                  {category.columns.map((column) => (
                    <div key={column.title} className="mb-5">
                      <h4 className="mb-3 text-xs font-semibold tracking-wider text-gray-500">
                        {column.title}
                      </h4>

                      <ul className="space-y-3">
                        {column.items.map((item) => (
                          <li key={item}>
                            <button
                              onClick={() => setActiveCategory(null)}
                              className="text-sm hover:text-gray-500"
                            >
                              {item}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}