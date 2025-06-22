import React, { useState, useEffect, useRef } from 'react';
import { usePage, router } from '@inertiajs/react';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import axios from 'axios';
import { route } from 'ziggy-js';

window.Pusher = Pusher;

const echo = new Echo({
  broadcaster: 'pusher',
  key: 'afd4862cb9a45f6dc62e',
  cluster: 'ap1',
  encrypted: true,
});

export default function NotificationBell() {
  const { auth } = usePage().props;
  const [notifications, setNotifications] = useState(auth.user?.notifications || []);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!auth.user) return;

    const channel = echo.private(`App.Models.User.${auth.user.id}`);

    channel.notification((notification) => {
      console.log("Received live notification:", notification);
      setNotifications((prev) => [notification, ...prev]);
    });

    return () => {
      echo.leave(`App.Models.User.${auth.user.id}`);
    };
  }, [auth.user]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.read_at).length;

  const handleClick = (notif) => {
    axios.post(route('notifications.read', notif.id))
      .then(() => {
        setNotifications((prev) => prev.filter(n => n.id !== notif.id));

        // Role-based redirect
        if (auth.user.role === 'customer') {
          router.visit(route('customer.profile'));
        } else if (notif.data?.url) {
          router.visit(notif.data.url);
        } else if (notif.data?.user_id) {
          // Example: owner user show page
          router.visit(route('owner.users.show', notif.data.user_id));
        } else {
          // fallback to dashboard or homepage
          router.visit(route('dashboard'));
        }
      })
      .catch((err) => {
        console.error('Failed to mark notification as read:', err);
      });
  };


  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setDropdownOpen((open) => !open)}
        className="relative focus:outline-none"
        aria-label="Notifications"
        title="Notifications"
      >
        {/* Bell Icon */}
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          viewBox="0 0 24 24"
        >
          <path d="M18 8a6 6 0 00-12 0c0 7-3 9-3 9h18s-3-2-3-9"></path>
          <path d="M13.73 21a2 2 0 01-3.46 0"></path>
        </svg>

        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 block w-3 h-3 rounded-full bg-red-600 ring-2 ring-white animate-pulse"></span>
        )}
      </button>

      {dropdownOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-white border rounded shadow-lg z-50 max-h-96 overflow-auto">
          <div className="p-2 border-b font-semibold text-gray-700">
            Notifications {unreadCount > 0 && `(${unreadCount})`}
          </div>

          {notifications.length === 0 && (
            <p className="p-4 text-center text-gray-500">No notifications</p>
          )}

          {notifications.map((notif) => (
            <div
              key={notif.id}
              onClick={() => handleClick(notif)}
              className={`p-3 border-b cursor-pointer hover:bg-gray-100 ${
                !notif.read_at ? 'bg-gray-100 font-medium' : ''
              }`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleClick(notif);
                }
              }}
            >
              <p>{notif.data?.message || 'New notification'}</p>
              <small className="text-xs text-gray-400">
                {new Date(notif.created_at).toLocaleString()}
              </small>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
