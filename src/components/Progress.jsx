import { useState } from "react";

function Progress() {
  const [subjects] = useState([
    { name: "Data Structures", progress: 78 },
    { name: "DBMS", progress: 52 },
    { name: "Java", progress: 86 },
    { name: "Mathematics", progress: 41 },
  ]);

  const overallProgress = Math.round(
    subjects.reduce((sum, subject) => sum + subject.progress, 0) /
      subjects.length
  );

  return (
    <div className="progress-page">
      <div className="page-heading">
        <h1>Your Progress 📊</h1>
        <p>Track your learning progress across all subjects.</p>
      </div>

      <div className="progress-overview">
        <div className="overall-progress">
          <div className="progress-circle">
            <strong>{overallProgress}%</strong>
          </div>

          <div>
            <h2>Overall Progress</h2>
            <p>Keep going! You're making progress.</p>
          </div>
        </div>

        <div className="progress-stats">
          <div>
            <strong>7</strong>
            <span>Study Streak</span>
          </div>

          <div>
            <strong>24</strong>
            <span>Hours Studied</span>
          </div>

          <div>
            <strong>32</strong>
            <span>Tasks Completed</span>
          </div>
        </div>
      </div>

      <div className="subject-progress-card">
        <h2>Subject Progress</h2>
        <p>See how you're performing in each subject.</p>

        <div className="progress-subject-list">
          {subjects.map((subject) => (
            <div className="progress-subject" key={subject.name}>
              <div className="progress-subject-top">
                <span>{subject.name}</span>
                <strong>{subject.progress}%</strong>
              </div>

              <div className="big-progress-bar">
                <div
                  className="big-progress-fill"
                  style={{ width: `${subject.progress}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Progress;