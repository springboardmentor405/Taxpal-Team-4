import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";

export default function Dashboard() {
  const salesData = [
    { name: "Jan", sales: 20 },
    { name: "Feb", sales: 40 },
    { name: "Mar", sales: 30 },
    { name: "Apr", sales: 60 },
    { name: "May", sales: 45 },
    { name: "Jun", sales: 70 },
    { name: "Jul", sales: 55 }
  ];

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Inter, sans-serif", background: "#f5f6fa" }}>
      
      {/* SIDEBAR */}
      <div style={{
        width: "240px",
        background: "#ffffff",
        padding: "30px 20px",
        borderRight: "1px solid #e5e7eb"
      }}>
        <h2 style={{ color: "#4f46e5", marginBottom: "40px" }}>DashStack</h2>

        <SidebarItem text="Dashboard" active />
        <SidebarItem text="Products" />
        <SidebarItem text="Favorites" />
        <SidebarItem text="Inbox" />
        <SidebarItem text="Order Lists" />
        <SidebarItem text="Product Stock" />

        <p style={{ marginTop: "30px", fontSize: "12px", color: "#9ca3af" }}>PAGES</p>

        <SidebarItem text="Pricing" />
        <SidebarItem text="Calendar" />
        <SidebarItem text="To-Do" />
        <SidebarItem text="Contact" />
        <SidebarItem text="Invoice" />
        <SidebarItem text="UI Elements" />
        <SidebarItem text="Team" />
        <SidebarItem text="Table" />
      </div>

      {/* MAIN AREA */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>

        {/* TOP NAVBAR */}
        <div style={{
          height: "70px",
          background: "#ffffff",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 30px",
          borderBottom: "1px solid #e5e7eb"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            background: "#f3f4f6",
            padding: "8px 15px",
            borderRadius: "8px",
            width: "300px"
          }}>
            <FiSearch style={{ marginRight: "8px", color: "#6b7280" }} />
            <input
              type="text"
              placeholder="Search"
              style={{
                border: "none",
                outline: "none",
                background: "transparent",
                width: "100%"
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            <FaBell style={{ color: "#6b7280", cursor: "pointer" }} />
            <span style={{ fontSize: "14px", color: "#6b7280" }}>English</span>
            <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <FaUserCircle size={22} />
              <div>
                <div style={{ fontSize: "14px" }}>Moni Roy</div>
                <div style={{ fontSize: "12px", color: "#9ca3af" }}>Admin</div>
              </div>
            </div>
          </div>
        </div>

        {/* DASHBOARD CONTENT */}
        <div style={{ padding: "30px" }}>
          <h2 style={{ marginBottom: "20px" }}>Dashboard</h2>

          {/* STAT CARDS */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "20px", marginBottom: "30px" }}>
            <StatCard title="Total User" value="40,689" trend="+8.5%" positive />
            <StatCard title="Total Order" value="10,293" trend="+1.3%" positive />
            <StatCard title="Total Sales" value="$89,000" trend="-4.3%" />
            <StatCard title="Total Pending" value="2040" trend="+1.8%" positive />
          </div>

          {/* SALES CHART */}
          <div style={{
            background: "#ffffff",
            padding: "25px",
            borderRadius: "12px",
            boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
          }}>
            <h3 style={{ marginBottom: "20px" }}>Sales Details</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="sales"
                  stroke="#4f46e5"
                  strokeWidth={3}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}

/* COMPONENTS */

function SidebarItem({ text, active }) {
  return (
    <div style={{
      padding: "10px",
      borderRadius: "8px",
      marginBottom: "8px",
      cursor: "pointer",
      background: active ? "#4f46e5" : "transparent",
      color: active ? "white" : "#374151",
      fontWeight: active ? 500 : 400
    }}>
      {text}
    </div>
  );
}

function StatCard({ title, value, trend, positive }) {
  return (
    <div style={{
      background: "#ffffff",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.05)"
    }}>
      <div style={{ fontSize: "13px", color: "#9ca3af" }}>{title}</div>
      <div style={{ fontSize: "22px", fontWeight: 600, margin: "10px 0" }}>{value}</div>
      <div style={{
        fontSize: "13px",
        color: positive ? "#10b981" : "#ef4444"
      }}>
        {trend} {positive ? "Up from yesterday" : "Down from yesterday"}
      </div>
    </div>
  );
}