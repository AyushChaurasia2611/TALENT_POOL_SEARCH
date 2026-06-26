const SKILL_COLORS = [
  'badge-skill',
];

function getInitials(name) {
  if (!name) return '?';
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

const MAX_VISIBLE_SKILLS = 5;

export default function CandidateCard({ candidate, onClick }) {
  const {
    name,
    most_recent_title,
    years_experience,
    location,
    skills = [],
  } = candidate;

  const visibleSkills = skills.slice(0, MAX_VISIBLE_SKILLS);
  const remaining = skills.length - MAX_VISIBLE_SKILLS;

  return (
    <div
      className="candidate-card"
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onClick()}
      aria-label={`View ${name || 'Unknown'}'s profile`}
    >
      <div className="candidate-avatar">{getInitials(name)}</div>

      <div className="candidate-name">{name || 'Unknown Candidate'}</div>
      {most_recent_title && (
        <div className="candidate-title">{most_recent_title}</div>
      )}

      <div className="candidate-meta">
        {years_experience != null && (
          <span className="badge badge-exp">
            ⏱ {years_experience} yr{years_experience !== 1 ? 's' : ''}
          </span>
        )}
        {location && (
          <span className="badge badge-location">
            📍 {location}
          </span>
        )}
      </div>

      {visibleSkills.length > 0 && (
        <div className="candidate-skills">
          {visibleSkills.map((skill) => (
            <span key={skill} className="badge badge-skill">{skill}</span>
          ))}
          {remaining > 0 && (
            <span className="skills-overflow">+{remaining} more</span>
          )}
        </div>
      )}
    </div>
  );
}
