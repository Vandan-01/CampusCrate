import React, { useState } from "react";
import { FaUser, FaEdit, FaSave } from "react-icons/fa";
import "./Profile.css";

function Profile() {

  const [edit, setEdit] = useState(false);

  const [profile, setProfile] = useState({
    name: "Jasreet",
    email: "jasreet@example.com",
    department: "Computer Science",
    college: "IIT Jammu",
  });


  const handleChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };


  return (
    <div className="profile-container">

      <div className="profile-card">

        <div className="profile-image">
          <FaUser />
        </div>


        {
          edit ? (
            <>
              <input
                name="name"
                value={profile.name}
                onChange={handleChange}
              />

              <input
                name="email"
                value={profile.email}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2>{profile.name}</h2>
              <p className="email">{profile.email}</p>
            </>
          )
        }


        <div className="profile-details">

          <div className="detail-box">
            <h4>Department</h4>

            {
              edit ? (
                <input
                  name="department"
                  value={profile.department}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.department}</p>
              )
            }

          </div>


          <div className="detail-box">
            <h4>College</h4>

            {
              edit ? (
                <input
                  name="college"
                  value={profile.college}
                  onChange={handleChange}
                />
              ) : (
                <p>{profile.college}</p>
              )
            }

          </div>


          <div className="detail-box">
            <h4>Lost Items</h4>
            <p>3</p>
          </div>


          <div className="detail-box">
            <h4>Found Items</h4>
            <p>2</p>
          </div>


        </div>


        <button
          className="edit-btn"
          onClick={() => setEdit(!edit)}
        >
          {
            edit ? <FaSave /> : <FaEdit />
          }

          {
            edit ? "Save Profile" : "Edit Profile"
          }

        </button>


      </div>

    </div>
  );
}

export default Profile;