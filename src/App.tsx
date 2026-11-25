import { useEffect, useState } from "react";

import { loadCourses } from "./data/courseApi";

import type { Course } from "./types/course";

import Search from "./components/Search";
import CourseCard from "./components/CourseCard";

function Catalogue() {
  const [courseList, setCourseList] = useState<Course[]>([]);

  const [status, setStatus] = useState<
    "loading" | "error" | "ready"
  >("loading");

  const [query, setQuery] = useState("");

  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  useEffect(() => {
    loadCourses()
      .then((data) => {
        setCourseList(data);
        setStatus("ready");
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  const filteredCourses = courseList.filter((course) =>
    course.title.toLowerCase().includes(query.toLowerCase())
  );

  function toggleCourse(id: number) {
    setSelectedIds((prev) =>
      prev.includes(id)
        ? prev.filter((item) => item !== id)
        : [...prev, id]
    );
  }

  useEffect(() => {
    const count = selectedIds.length;

    document.title =
      count > 0
        ? `(${count}) Каталог курсов`
        : "Каталог курсов";

    return () => {
      document.title = "Каталог курсов";
    };
  }, [selectedIds]);

  return (
    <div className="app">
      {}
      <header className="header">
        <div className="header-content">
          <h1>CourseHub</h1>

          <div className="selected-counter">
            <span>Выбрано курсов:</span>
            <strong>{selectedIds.length}</strong>
          </div>
        </div>
      </header>

      <main className="container">
        {}
        <section className="intro">
          <h2>Каталог курсов</h2>

          <p>
            Найди подходящий курс и добавь его в список выбранных.
          </p>
        </section>

        {}
        <Search
          query={query}
          onQueryChange={setQuery}
        />

        {}
        {status === "loading" && (
          <div className="empty-state">
            <h3>Загрузка курсов...</h3>
            <p>Пожалуйста, подожди немного.</p>
          </div>
        )}

        {}
        {status === "error" && (
          <div className="empty-state">
            <h3>Ошибка загрузки</h3>
            <p>Не удалось загрузить курсы. Попробуй обновить страницу.</p>
          </div>
        )}

        {}
        {status === "ready" && (
          <>
            <div className="catalogue-heading">
              <h2>Все курсы</h2>

              <span>
                Найдено: {filteredCourses.length}
              </span>
            </div>

            {filteredCourses.length > 0 ? (
              <div className="courses-list">
                {filteredCourses.map((course) => (
                  <CourseCard
                    key={course.id}
                    course={course}
                    isSelected={selectedIds.includes(course.id)}
                    onToggle={toggleCourse}
                  />
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>Курсы не найдены</h3>

                <p>
                  Попробуй изменить поисковый запрос.
                </p>

                <button onClick={() => setQuery("")}>
                  Сбросить поиск
                </button>
              </div>
            )}

            {/* Выбранные курсы */}
            {selectedIds.length > 0 && (
              <section className="selected-section">
                <h2>Выбранные курсы</h2>

                <div className="selected-list">
                  {courseList
                    .filter((course) =>
                      selectedIds.includes(course.id)
                    )
                    .map((course) => (
                      <div
                        className="selected-item"
                        key={course.id}
                      >
                        <span>{course.title}</span>

                        <button
                          onClick={() => toggleCourse(course.id)}
                          aria-label={`Убрать курс ${course.title}`}
                        >
                          Удалить
                        </button>
                      </div>
                    ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>

      {/* Подвал */}
      <footer className="footer">
        <p>CourseHub — каталог образовательных курсов</p>
      </footer>
    </div>
  );
}

export default Catalogue;