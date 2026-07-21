import Link from "next/link";

const GRADIENTS = [
  "linear-gradient(135deg,#1e3a5f,#2563eb)",
  "linear-gradient(135deg,#1a1a2e,#7c3aed)",
  "linear-gradient(135deg,#0f172a,#059669)",
  "linear-gradient(135deg,#1e1b4b,#3b82f6)",
];

function gradientFor(id) {
  const chars = String(id ?? "").split("");
  const sum = chars.reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return GRADIENTS[sum % GRADIENTS.length];
}

function formatDate(dateStr) {
  if (!dateStr) return null;
  try {
    return new Date(dateStr).toLocaleDateString("es-PE", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return null;
  }
}

export default function CourseCard({ course }) {
  const { _id, name, description, category, teacher, createdAt } = course;
  const date = formatDate(createdAt);

  return (
    <article className="course-card" role="listitem">
      <div className="course-card-image" style={{ background: gradientFor(_id) }}>
        <span aria-hidden="true">📘</span>
        {category && (
          <span className="course-card-badge badge badge-primary">{category}</span>
        )}
      </div>

      <div className="course-card-body">
        {category && <div className="course-category">{category}</div>}
        <h3 className="course-title">{name}</h3>
        {teacher?.name && (
          <p className="course-instructor">👨‍🏫 {teacher.name}</p>
        )}
        {description && <p className="course-description">{description}</p>}
      </div>

      <div className="course-card-footer">
        <span className="course-date">{date ? `Publicado ${date}` : ""}</span>
        <Link href={`/cursos/${_id}`} className="btn btn-primary btn-sm">
          Ver curso
        </Link>
      </div>
    </article>
  );
}
