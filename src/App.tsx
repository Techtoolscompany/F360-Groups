import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { SidebarProvider } from './context/SidebarContext';
import { OnlineUsersProvider } from './context/OnlineUsersContext';
import { PostProvider } from './context/PostContext';
import { MessageProvider } from './context/MessageContext';
import { AuthProvider } from './context/AuthContext';
import { CalendarProvider } from './context/CalendarContext';
import { SermonProvider } from './context/SermonContext';
import AuthScreen from './components/auth/AuthScreen';
import MainLayout from './components/layout/MainLayout';
import Feed from './components/screens/Feed';
import Messages from './components/screens/Messages';
import MessagePage from './components/screens/MessagePage';
import Calendar from './components/screens/Calendar';
import Settings from './components/screens/Settings';
import Courses from './components/screens/Courses';
import Channel from './components/screens/Channel';
import Announcements from './components/screens/Announcements';
import UserProfile from './components/profile/UserProfile';
import ProfileSettings from './components/profile/ProfileSettings';
import Sermons from './components/screens/Sermons';
import InstallPWA from './components/shared/InstallPWA';
import { registerSW } from 'virtual:pwa-register';

function App() {
  useEffect(() => {
    const updateSW = registerSW({
      onNeedRefresh() {
        if (confirm('New content available. Reload?')) {
          updateSW(true);
        }
      },
      onOfflineReady() {
        console.log('App ready to work offline');
      },
    });
  }, []);

  return (
    <AuthProvider>
      <ThemeProvider>
        <CalendarProvider>
          <SermonProvider>
            <SidebarProvider>
              <OnlineUsersProvider>
                <PostProvider>
                  <MessageProvider>
                    <Routes>
                      <Route path="/" element={<AuthScreen />} />
                      <Route element={<MainLayout />}>
                        <Route path="/feed" element={<Feed />} />
                        <Route path="/messages" element={<Messages />} />
                        <Route path="/messages/:userId" element={<MessagePage />} />
                        <Route path="/calendar" element={<Calendar />} />
                        <Route path="/courses" element={<Courses />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/channels/:channelId" element={<Channel />} />
                        <Route path="/announcements" element={<Announcements />} />
                        <Route path="/profile/:userId" element={<UserProfile />} />
                        <Route path="/profile/settings" element={<ProfileSettings />} />
                        <Route path="/sermons" element={<Sermons />} />
                      </Route>
                    </Routes>
                    <InstallPWA />
                  </MessageProvider>
                </PostProvider>
              </OnlineUsersProvider>
            </SidebarProvider>
          </SermonProvider>
        </CalendarProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;