import { useState } from "react";

function StudyPlan({ onBack }) {
  const [subjects, setSubjects] = useState("");
  const [hours, setHours] = useState("3");
  const [examDate, setExamDate] = useState("");
  const [weakSubject, setWeakSubject] = useState("");
  const [level, setLevel] = useState("Intermediate");
  const [plan, setPlan] = useState(null);

  const generatePlan = async () => {
    if (!subjects || !examDate || !weakSubject) {
      alert("Please fill all the required fields.");
      return;
    }

    try {
      const response = await fetch(
        "http://localhost:5000/api/generate-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            subjects,
            hours,
            examDate,
            weakSubject,
            level,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate plan");
      }

      setPlan(data.plan);
    } catch (error) {
      console.error(error);
      alert(
        "AI plan generate nahi ho paya. Make sure backend server is running."
      );
    }
  };

  return (
    <div className="study-plan-page">
      <div className="page-heading">
        <div>
          <button className="back-btn" onClick={onBack}>
            ← Back to Dashboard
          </button>

          <h1>Create Your Study Plan</h1>

          <p>
            Tell us about your studies and we'll create a personalized plan.
          </p>
        </div>
      </div>

      <div className="study-plan-grid">
        <div className="form-card">
          <h2>Study Information</h2>

          <p className="form-subtitle">
            Enter your current study details.
          </p>

          <label>What are you studying?</label>

          <input
            type="text"
            placeholder="e.g. DSA, DBMS, Java"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
          />

          <label>How many hours can you study daily?</label>

          <select
            value={hours}
            onChange={(e) => setHours(e.target.value)}
          >
            <option value="1">1 hour</option>
            <option value="2">2 hours</option>
            <option value="3">3 hours</option>
            <option value="4">4 hours</option>
            <option value="5">5+ hours</option>
          </select>

          <label>Exam date</label>

          <input
            type="date"
            value={examDate}
            onChange={(e) => setExamDate(e.target.value)}
          />

          <label>Your weakest subject</label>

          <input
            type="text"
            placeholder="e.g. DBMS"
            value={weakSubject}
            onChange={(e) => setWeakSubject(e.target.value)}
          />

          <label>Current level</label>

          <div className="level-options">
            {["Beginner", "Intermediate", "Advanced"].map((item) => (
              <button
                type="button"
                key={item}
                className={
                  level === item
                    ? "level active-level"
                    : "level"
                }
                onClick={() => setLevel(item)}
              >
                {item}
              </button>
            ))}
          </div>

          <button
            className="generate-btn"
            onClick={generatePlan}
          >
            ✦ Generate Study Plan
          </button>
        </div>

        <div className="preview-card">
          <div className="preview-icon">✦</div>

          <h2>Your Personalized Plan</h2>

          {!plan ? (
            <div className="empty-plan">
              <div className="empty-icon">◷</div>

              <h3>Your plan will appear here</h3>

              <p>
                Fill in your study information and click Generate
                Study Plan.
              </p>
            </div>
          ) : (
            <div className="generated-plan">
              <div className="plan-summary">
                <span>{hours} hrs/day</span>
                <span>{level}</span>
              </div>

              {plan.map((item, index) => (
                <div
                  className="generated-item"
                  key={`${item.time}-${index}`}
                >
                  <span className="generated-time">
                    {item.time}
                  </span>

                  <div>
                    <strong>{item.subject}</strong>
                    <p>{item.topic}</p>
                  </div>

                  <span>{item.duration}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default StudyPlan;