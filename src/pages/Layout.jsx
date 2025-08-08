
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Home, User, BarChart3, Settings, BookOpen, Star } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

const navigationItems = [
  {
    title: "Dashboard",
    url: createPageUrl("Dashboard"),
    icon: Home,
  },
  {
    title: "Children",
    url: createPageUrl("Children"),
    icon: User,
  },
  {
    title: "Activities",
    url: createPageUrl("Activities"),
    icon: BookOpen,
  },
  {
    title: "Progress",
    url: createPageUrl("Progress"),
    icon: BarChart3,
  },
  {
    title: "Settings",
    url: createPageUrl("Settings"),
    icon: Settings,
  },
];

export default function Layout({ children }) {
  const location = useLocation();
  const isChildView = location.pathname.includes('/child/');

  // For child views, don't show the sidebar
  if (isChildView) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
        <style>{`
          :root {
            --primary-blue: #3B82F6;
            --soft-blue: #E8F4FD;
            --warm-orange: #FFE4CC;
            --gentle-green: #E8F5E8;
            --accent-purple: #A855F7;
            --text-primary: #1F2937;
            --text-secondary: #6B7280;
          }
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          }
          
          .btn-primary {
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
          
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        {children}
      </div>
    );
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-gradient-to-br from-blue-50 via-orange-50 to-green-50">
        <style>{`
          :root {
            --primary-blue: #3B82F6;
            --soft-blue: #E8F4FD;
            --warm-orange: #FFE4CC;
            --gentle-green: #E8F5E8;
            --accent-purple: #A855F7;
            --text-primary: #1F2937;
            --text-secondary: #6B7280;
          }
          
          * {
            font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
          }
          
          .btn-primary {
            background: linear-gradient(135deg, var(--primary-blue), var(--accent-purple));
            transition: all 0.3s ease;
          }
          
          .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 8px 25px rgba(59, 130, 246, 0.3);
          }
          
          .card-hover {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          }
          
          .card-hover:hover {
            transform: translateY(-4px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          }
        `}</style>
        
        <Sidebar className="border-r border-white/20 bg-white/80 backdrop-blur-xl">
          <SidebarHeader className="border-b border-gray-100 p-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <div>
                <h2 className="font-bold text-xl text-gray-900">SpeakRead</h2>
                <p className="text-sm text-gray-500">Learning Made Fun</p>
              </div>
            </div>
          </SidebarHeader>
          
          <SidebarContent className="p-4">
            <SidebarGroup>
              <SidebarGroupLabel className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-2">
                Navigation
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {navigationItems.map((item) => (
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton 
                        asChild 
                        className={`hover:bg-blue-50 hover:text-blue-700 transition-all duration-300 rounded-xl mb-1 ${
                          location.pathname === item.url ? 'bg-blue-50 text-blue-700 shadow-sm' : ''
                        }`}
                      >
                        <Link to={item.url} className="flex items-center gap-3 px-4 py-3">
                          <item.icon className="w-5 h-5" />
                          <span className="font-medium">{item.title}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>

        <main className="flex-1 flex flex-col">
          <header className="bg-white/80 backdrop-blur-xl border-b border-gray-100 px-6 py-4 md:hidden">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="hover:bg-gray-100 p-2 rounded-xl transition-colors duration-300" />
              <h1 className="text-xl font-bold text-gray-900">SpeakRead</h1>
            </div>
          </header>

          <div className="flex-1 overflow-auto">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}
