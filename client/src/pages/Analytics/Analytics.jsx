import "./Analytics.css";

import {
  FaBoxOpen,
  FaUsers,
  FaBullhorn,
  FaFlag,
  FaClipboardList,
  FaCheckCircle,
  FaUserPlus
} from "react-icons/fa";

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from "recharts";

function Analytics() {

  const postData = [
    { month: "Jan", posts: 20 },
    { month: "Feb", posts: 35 },
    { month: "Mar", posts: 45 },
    { month: "Apr", posts: 30 },
    { month: "May", posts: 55 },
    { month: "Jun", posts: 70 },
  ];

  const categoryData = [
    {
      name: "Lost Items",
      value: 60
    },
    {
      name: "Found Items",
      value: 40
    }
  ];

  const activities = [
    "User posted a lost wallet",
    "Claim approved for ID Card",
    "New user registered",
    "Post reported by user"
  ];

  return (

    <div className="analytics-page">

      <h1>Analytics</h1>

      <div className="analytics-cards">

        <div className="analytics-card">

          <FaBoxOpen className="analytics-icon"/>

          <div>
            <h3>Total Posts</h3>
            <p>120</p>
          </div>

        </div>

        <div className="analytics-card">

          <FaUsers className="analytics-icon"/>

          <div>
            <h3>Total Users</h3>
            <p>450</p>
          </div>

        </div>

        <div className="analytics-card">

          <FaBullhorn className="analytics-icon"/>

          <div>
            <h3>Active Claims</h3>
            <p>35</p>
          </div>

        </div>

        <div className="analytics-card">

          <FaFlag className="analytics-icon"/>

          <div>
            <h3>Reported Posts</h3>
            <p>12</p>
          </div>

        </div>

      </div>

      <div className="charts-container">

        <div className="chart-box">

          <h2>Posts Overview</h2>

          <ResponsiveContainer width="100%" height={300}>

            <BarChart data={postData}>

              <XAxis dataKey="month"/>

              <YAxis/>

              <Tooltip/>

              <Bar 
                dataKey="posts"
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

        <div className="chart-box">

          <h2>Item Distribution</h2>

          <ResponsiveContainer width="100%" height={300}>

            <PieChart>
              <Pie
                data={categoryData}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
              >
                {
                  categoryData.map((item,index)=>(
                    <Cell key={index}/>
                  ))
                }

              </Pie>

              <Tooltip/>

            </PieChart>

          </ResponsiveContainer>

        </div>
      </div>

      <div className="activity-box">

        <h2>Recent Activity</h2>

        {
          activities.map((activity,index)=>(

            <div className="activity" key={index}>

              {
                index === 0 &&
                <FaClipboardList/>
              }

              {
                index === 1 &&
                <FaCheckCircle/>
              }

              {
                index === 2 &&
                <FaUserPlus/>
              }

              {
                index === 3 &&
                <FaFlag/>
              }

              <span>
                {activity}
              </span>

            </div>

          ))
        }

      </div>
    </div>

  );

}

export default Analytics;