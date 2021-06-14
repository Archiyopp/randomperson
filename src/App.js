import React, { useState, useEffect } from "react";
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
  FaFemale,
  FaMale,
} from "react-icons/fa";
const url = "https://randomuser.me/api/";
const defaultImage =
  "https://randomuser.me/api/portraits/men/75.jpg";
function App() {
  const [person, setPerson] = useState([]);
  const [loading, setLoading] = useState(true);
  const [title, setTitle] = useState("name");
  const [value, setValue] = useState("random");
  const fetchPerson = async () => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      const person = data.results[0];
      if (person) {
        const { phone, email, gender } = person;
        const { first, last } = person.name;
        const { large: image } = person.picture;
        const { age } = person.dob;
        const { number, name } = person.location.street;
        const { password } = person.login;

        const newPerson = {
          name: `${first} ${last}`,
          age,
          image,
          password,
          email,
          gender,
          phone,
          address: `${number} ${name}`,
        };
        setPerson(newPerson);
        setLoading(false);
        setTitle("name");
        setValue(newPerson.name);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };
  useEffect(() => {
    fetchPerson();
  }, []);
  return (
    <section>
      <div className="block bcg-black"></div>
      <div className="block">
        <div className="container">
          <img
            src={(person && person.image) || defaultImage}
            alt="random-user"
            className="user-img"
          />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaUser />
            </button>
            <button
              className="icon"
              data-label="gender"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              {person.gender === "male" ? (
                <FaMale />
              ) : (
                <FaFemale />
              )}
            </button>
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button
              className="icon"
              data-label="age"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaCalendarTimes />
            </button>
            <button
              className="icon"
              data-label="address"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaMap />
            </button>
            <button
              className="icon"
              data-label="phone"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaPhone />
            </button>
            <button
              className="icon"
              data-label="password"
              onMouseOver={handleValue}
              onFocus={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button
            className="btn"
            type="button"
            onClick={fetchPerson}
            onFocus={handleValue}
          >
            {loading ? "loading..." : "random user"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default App;
