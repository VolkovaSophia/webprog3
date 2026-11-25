import type { Course } from "../types/course";

interface CourseCardProps {
  course: Course;
  isSelected: boolean;
  onToggle: (id: number) => void;
}

function CourseCard({
  course,
  isSelected,
  onToggle,
}: CourseCardProps) {
  return (
    <div className="course-card">
      <div className="course-info">
        <span className="course-category">
          {course.category}
        </span>

        <h3>{course.title}</h3>

        <p>{course.description}</p>

        <span className="course-duration">
          <span>Продолжительность:</span> {course.duration}
        </span>
      </div>

      <button
        className={`select-button ${isSelected ? "selected" : ""}`}
        onClick={() => onToggle(course.id)}
      >
        {isSelected ? "Убрать из выбранного" : "Выбрать курс"}
      </button>
    </div>
  );
}

export default CourseCard;