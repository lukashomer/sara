import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/cup-button";
import Header from "./Header";
import {
  Home,
  Users,
  Briefcase,
  BarChart2,
  Settings,
  LogOut,
} from "lucide-react";
import { SFSymbol } from "react-sf-symbols";

interface SidebarItemProps {
  icon: React.ReactNode;
  label: string;
  active?: boolean;
  onClick?: () => void;
}

const SidebarItem = ({
  icon,
  label,
  active = false,
  onClick,
}: SidebarItemProps) => (
  <div
    className={`flex items-center space-x-3 px-4 py-3 rounded-md cursor-pointer ${active ? "bg-primary text-white" : "hover:bg-secondary"}`}
    onClick={onClick}
  >
    <div>{icon}</div>
    <div className="font-medium">{label}</div>
  </div>
);

const CrmDashboard = () => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("dashboard");

  const handleLaunchChat = () => {
    navigate("/");
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <Header onMenuClick={() => {}} />

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 p-4 hidden md:block">
          <div className="space-y-1">
            <SidebarItem
              icon={<Home size={18} />}
              label="Dashboard"
              active={activeItem === "dashboard"}
              onClick={() => setActiveItem("dashboard")}
            />
            <SidebarItem
              icon={<Users size={18} />}
              label="Contacts"
              active={activeItem === "contacts"}
              onClick={() => setActiveItem("contacts")}
            />
            <SidebarItem
              icon={<Briefcase size={18} />}
              label="Leads"
              active={activeItem === "leads"}
              onClick={() => setActiveItem("leads")}
            />
            <SidebarItem
              icon={<BarChart2 size={18} />}
              label="Analytics"
              active={activeItem === "analytics"}
              onClick={() => setActiveItem("analytics")}
            />
            <SidebarItem
              icon={<Settings size={18} />}
              label="Settings"
              active={activeItem === "settings"}
              onClick={() => setActiveItem("settings")}
            />
          </div>

          <div className="absolute bottom-4 left-4 right-4 space-y-2">
            <Button
              onClick={handleLaunchChat}
              className="w-full justify-start"
              variant="soft"
            >
              <span className="mr-2">💬</span> Launch Chat
            </Button>
            <Button
              onClick={handleLogout}
              className="w-full justify-start"
              variant="ghost"
            >
              <LogOut size={18} className="mr-2" /> Logout
            </Button>
          </div>
        </div>

        {/* Mobile sidebar button */}
        <div className="md:hidden fixed bottom-4 right-4 z-10">
          <Button
            onClick={handleLaunchChat}
            size="lg"
            className="rounded-full shadow-lg"
          >
            <span className="mr-2">💬</span> Chat
          </Button>
        </div>

        {/* Main content */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="mb-6">
            <h1 className="text-2xl font-bold">My CRM</h1>
            <p className="text-gray-500">
              Welcome to your real estate dashboard
            </p>
          </div>

          {activeItem === "dashboard" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Stats cards */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-500">Active Listings</h3>
                <p className="text-3xl font-bold mt-2">24</p>
                <p className="text-green-500 text-sm mt-2">
                  ↑ 12% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-500">New Leads</h3>
                <p className="text-3xl font-bold mt-2">18</p>
                <p className="text-green-500 text-sm mt-2">
                  ↑ 5% from last month
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <h3 className="font-medium text-gray-500">Pending Sales</h3>
                <p className="text-3xl font-bold mt-2">7</p>
                <p className="text-red-500 text-sm mt-2">
                  ↓ 2% from last month
                </p>
              </div>

              {/* Recent activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 md:col-span-2 lg:col-span-3">
                <h3 className="font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {[
                    {
                      title: "New lead assigned",
                      description:
                        "John Smith is interested in 123 Maple Street",
                      time: "2 hours ago",
                    },
                    {
                      title: "Property viewing scheduled",
                      description:
                        "Sarah Johnson will view 456 Oak Avenue tomorrow at 2pm",
                      time: "5 hours ago",
                    },
                    {
                      title: "Offer submitted",
                      description:
                        "Michael Brown submitted an offer for 789 Pine Boulevard",
                      time: "Yesterday",
                    },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="flex items-start pb-4 border-b border-gray-100 last:border-0"
                    >
                      <div className="bg-blue-100 p-2 rounded-full mr-4">
                        <Users size={16} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{item.title}</p>
                        <p className="text-gray-500 text-sm">
                          {item.description}
                        </p>
                        <p className="text-gray-400 text-xs mt-1">
                          {item.time}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeItem === "contacts" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Contacts</h2>
              <p className="text-gray-500">Your contacts will appear here.</p>
            </div>
          )}

          {activeItem === "leads" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Leads</h2>
              <p className="text-gray-500">Your leads will appear here.</p>
            </div>
          )}

          {activeItem === "analytics" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Analytics</h2>
              <p className="text-gray-500">Your analytics will appear here.</p>
            </div>
          )}

          {activeItem === "settings" && (
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-4">Settings</h2>
              <p className="text-gray-500">Your settings will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CrmDashboard;
