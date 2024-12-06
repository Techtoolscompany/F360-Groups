import React from 'react';
import { Link } from 'react-router-dom';

interface UserProfileLinkProps {
  userId: string;
  userName: string;
  userAvatar: string;
  showAvatar?: boolean;
  showName?: boolean;
  className?: string;
}

function UserProfileLink({ 
  userId, 
  userName, 
  userAvatar, 
  showAvatar = true, 
  showName = true,
  className = ''
}: UserProfileLinkProps) {
  return (
    <Link 
      to={`/profile/${userId}`} 
      className={`flex items-center space-x-2 hover:opacity-80 transition-opacity ${className}`}
    >
      {showAvatar && (
        <img 
          src={userAvatar} 
          alt={userName} 
          className="w-10 h-10 rounded-full"
        />
      )}
      {showName && (
        <span className="font-medium text-white">{userName}</span>
      )}
    </Link>
  );
}

export default UserProfileLink;