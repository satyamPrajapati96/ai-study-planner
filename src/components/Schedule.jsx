import { useState } from "react";

function Schedule() {
  const [sessions, setSessions] = useState([
    {
      id: 1,
      time: "09:00 AM",
      subject: "Data Structures",
      topic: "Binary Trees & BST",
      duration: "60 min",
      completed: false,
    },
    {
      id: 2,
      time: "11:00 AM",
      subject: "DBMS",
      topic: "Normalization",
      duration: "45 min",
      completed: false,
    },
    {
      id: 3,
      time: "02:30 PM",
      subject: "Java",
      topic: "Collections Framework",
      duration: "60 min",
      completed: false,
    },
  ]);

  const toggleComplete = (id) => {
    setSessions(
      sessions.map((session) =>
        session.id === id
          ? { ...session, completed: !session.completed }
          : session
      )
    );
  };

  const completedCount = sessions.filter(
    (session) => session.completed
  ).length;

  return (
    <div className="schedule-page">
      <div className="page-heading">
        <h1>My Study Schedule 📅</h1>
        <p>Manage your daily study sessions.</p>
      </div>

      <div className="schedule-summary">
        <h2>Today's Progress</h2>
        <p>
          {completedCount} of {sessions.length} sessions completed
        </p>
      </div>

      <div className="schedule-list">
        {sessions.map((session) => (
          <div className="schedule-card" key={session.id}>
            <div>
              <span className="schedule-time">{session.time}</span>
              <h3>{session.subject}</h3>
              <p>{session.topic}</p>
              <small>{session.duration}</small>
            </div>

            <button
              className={
                session.completed
                  ? "complete-btn completed"
                  : "complete-btn"
              }
              onClick={() => toggleComplete(session.id)}
            >
              {session.completed ? "✓ Completed" : "Mark Complete"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Schedule;