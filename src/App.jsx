import { useState } from "react";
import StudyPlan from "./components/StudyPlan";
import Schedule from "./components/Schedule";
import Progress from "./components/Progress";
import "./App.css";

function App() {
  const [activeMenu, setActiveMenu] = useState("Dashboard");

  const menuItems = [
    { name: "Dashboard", icon: "⌂" },
    { name: "Study Plan", icon: "▣" },
    { name: "Schedule", icon: "◷" },
    { name: "Progress", icon: "◒" },
  ];

  const subjects = [
    { name: "Data Structures", progress: 78, color: "purple" },
    { name: "DBMS", progress: 52, color: "blue" },
    { name: "Java", progress: 86, color: "green" },
    { name: "Mathematics", progress: 41, color: "orange" },
  ];

  const todayPlan = [
    {
      time: "09:00 AM",
      subject: "Data Structures",
      topic: "Binary Trees & BST",
      duration: "60 min",
      type: "Deep Study",
    },
    {
      time: "11:00 AM",
      subject: "DBMS",
      topic: "Normalization",
      duration: "45 min",
      type: "Practice",
    },
    {
      time: "02:30 PM",
      subject: "Java",
      topic: "Collections Framework",
      duration: "60 min",
      type: "Revision",
    },
  ];

  return (
    <div className="app">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="brand">
          <div className="brand-logo">✦</div>
          <div>
            <h2>StudyAI</h2>
            <span>Smart Study Planner</span>
          </div>
        </div>

        <div className="menu-title">MENU</div>

        <nav>
          {menuItems.map((item) => (
            <button
              key={item.name}
              className={`menu-item ${
                activeMenu === item.name ? "active" : ""
              }`}
              onClick={() => setActiveMenu(item.name)}
            >
              <span className="menu-icon">{item.icon}</span>
              {item.name}
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="upgrade-card">
            <div className="upgrade-icon">✦</div>
            <h3>Study smarter</h3>
            <p>Let AI create a plan that fits your goals.</p>
            <button>Generate Plan →</button>
          </div>

          <button className="settings">⚙ Settings</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main">
  {activeMenu === "Study Plan" ? (
    <StudyPlan onBack={() => setActiveMenu("Dashboard")} />
    ) : activeMenu === "Schedule" ? (
  <Schedule />
  ) : activeMenu === "Progress" ? (
  <Progress />
  ) : (
    <>
      <header className="topbar">
          <div>
            <p className="date">MONDAY, SEPTEMBER 28, 2026</p>
            <h1>Good evening, Satyam 👋</h1>
            <p className="subtitle">
              Let's make today productive without burning out.
            </p>
          </div>

          <div className="profile">
            <div className="notification">♢</div>
            <div className="avatar">S</div>
          </div>
        </header>

        {/* Stats */}
        <section className="stats">
          <div className="stat-card">
            <div className="stat-icon purple-bg">◈</div>
            <div>
              <span>Study Streak</span>
              <strong>7 Days 🔥</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon blue-bg">◷</div>
            <div>
              <span>Today's Hours</span>
              <strong>2.5 / 3 hrs</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon green-bg">✓</div>
            <div>
              <span>Tasks Completed</span>
              <strong>8 / 10</strong>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon orange-bg">◎</div>
            <div>
              <span>Overall Progress</span>
              <strong>68%</strong>
            </div>
          </div>
        </section>

        <div className="content-grid">
          {/* Today's Plan */}
          <section className="plan-section">
            <div className="section-header">
              <div>
                <h2>Today's Study Plan</h2>
                <p>Your personalized sessions for today</p>
              </div>
              <button className="view-btn">View Schedule →</button>
            </div>

            <div className="plan-list">
              {todayPlan.map((item, index) => (
                <div className="plan-card" key={item.subject}>
                  <div className="time">
                    <span>{item.time}</span>
                    <div className="timeline">
                      <div className={`timeline-dot dot-${index}`}></div>
                      {index !== todayPlan.length - 1 && (
                        <div className="timeline-line"></div>
                      )}
                    </div>
                  </div>

                  <div className="plan-info">
                    <div className="plan-top">
                      <span className="tag">{item.type}</span>
                      <span className="duration">{item.duration}</span>
                    </div>
                    <h3>{item.subject}</h3>
                    <p>{item.topic}</p>
                  </div>

                  <button className="start-btn">
                    {index === 0 ? "Start" : "Start →"}
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Right Column */}
          <aside className="right-column">
            {/* Progress */}
            <section className="panel">
              <div className="section-header">
                <div>
                  <h2>Subject Progress</h2>
                  <p>This week's progress</p>
                </div>
              </div>

              <div className="subjects">
                {subjects.map((subject) => (
                  <div className="subject" key={subject.name}>
                    <div className="subject-info">
                      <span>{subject.name}</span>
                      <strong>{subject.progress}%</strong>
                    </div>
                    <div className="progress-bar">
                      <div
                        className={`progress-fill ${subject.color}`}
                        style={{ width: `${subject.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* AI Recommendation */}
            <section className="ai-card">
              <div className="ai-top">
                <div className="ai-icon">✦</div>
                <span>AI INSIGHT</span>
              </div>

              <h2>Focus on DBMS today</h2>

              <p>
                Your DBMS progress is lower than your other subjects. Adding
                one extra practice session could help you catch up.
              </p>

              <button>Improve My Plan →</button>
            </section>
          </aside>
                </div>
      </>
      )}
      </main>
    </div>
  );
}

export default App;