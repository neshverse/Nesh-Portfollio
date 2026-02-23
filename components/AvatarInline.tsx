import React, { useMemo } from 'react';

interface AvatarInlineProps {
  className?: string;
  variant?: 'smile' | 'wink' | 'serious' | 'happy' | 'default';
}

const AvatarInline: React.FC<AvatarInlineProps> = ({ className = '', variant = 'default' }) => {
  // User customized: using local avatar.svg
  // To use your own image, replace 'avatar.svg' in the public/root folder
  const avatarUrl = '/avatar.svg';

  return (
    <img
      src={avatarUrl}
      alt="Dinesh Avatar"
      className={`object-cover ${className}`}
      loading="eager"
    />
  );
};

export default AvatarInline;
