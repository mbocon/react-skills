
import { useState, useEffect } from "react";
import "./App.css";

export default function App() {
  const [state, setState] = useState({
    skills: [],
    skill: "",
    level: "3"
  });

  function handleChange(e) {
    setState({ ...state, [e.target.name]: e.target.value })

  }

  async function handleSubmit(e) {
    e.preventDefault()
    await fetch("https://skills-api-phoenix.herokuapp.com/api/skills", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ skill: state.skill, level: state.level })
    })
    setState({
      skills: [...state.skills, { skill: state.skill, level: state.level }],
      skill: "",
      level: "3"
    })
  }

  useEffect(() => {
    async function getAppData() {
      const skills = await fetch('https://skills-api-phoenix.herokuapp.com/api/skills')
        .then(res => res.json())

      setState(prevState => ({
        ...prevState,
        skills
      }))
    }
    getAppData();
  }, [])

  return (
    <section>
      <h2>DEV SKILLS</h2>
      <hr />
      {state.skills.map((s) => (
        <article key={s.skill}>
          <div>{s.skill}</div> <div>{s.level}</div>
        </article>
      ))}
      <hr />
      <form onSubmit={handleSubmit}>
        <label>
          <span>SKILL</span>
          <input name="skill" value={state.skill} onChange={handleChange} />
        </label>
        <label>
          <span>LEVEL</span>
          <select name="level" value={state.level} onChange={handleChange} >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </label>
        <button>ADD SKILL</button>
      </form>
    </section>
  );
}
