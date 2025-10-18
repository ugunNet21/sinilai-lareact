// js/Components/Admin/FlashMessage.tsx
import React, { useEffect, useState } from 'react';
import { usePage } from '@inertiajs/react';
import { PageProps } from '@inertiajs/core';

interface FlashMessageProps {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  onClose?: () => void;
  autoClose?: boolean;
  duration?: number;
}

interface SharedProps {
  flash?: {
    success?: string;
    error?: string;
    warning?: string;
    info?: string;
  };
}

export const FlashMessage: React.FC<FlashMessageProps> = ({
  type,
  message,
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (autoClose && isVisible) {
      const timer = setTimeout(() => {
        handleClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, isVisible]);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose?.();
    }, 300);
  };

  if (!isVisible) return null;

  const getIcon = () => {
    switch (type) {
      case 'success':
        return <i className="fas fa-check-circle mr-3"></i>;
      case 'error':
        return <i className="fas fa-exclamation-circle mr-3"></i>;
      case 'warning':
        return <i className="fas fa-exclamation-triangle mr-3"></i>;
      case 'info':
        return <i className="fas fa-info-circle mr-3"></i>;
      default:
        return null;
    }
  };

  const getStyles = () => {
    const baseStyles = "flex items-center justify-between p-4 mb-6 rounded-lg shadow-lg transition-all duration-300 transform";
    
    switch (type) {
      case 'success':
        return `${baseStyles} bg-green-50 border border-green-200 text-green-800`;
      case 'error':
        return `${baseStyles} bg-red-50 border border-red-200 text-red-800`;
      case 'warning':
        return `${baseStyles} bg-yellow-50 border border-yellow-200 text-yellow-800`;
      case 'info':
        return `${baseStyles} bg-blue-50 border border-blue-200 text-blue-800`;
      default:
        return baseStyles;
    }
  };

  return (
    <div className={getStyles()}>
      <div className="flex items-center">
        {getIcon()}
        <div>
          <p className="font-medium">{message}</p>
        </div>
      </div>
      <button
        onClick={handleClose}
        className="ml-4 text-gray-500 hover:text-gray-700 transition-colors duration-200"
      >
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export const FlashMessages: React.FC = () => {
  const { props } = usePage<PageProps<SharedProps>>();
  const { flash } = props;
  const [messages, setMessages] = useState<{ id: string; type: string; message: string }[]>([]);

  useEffect(() => {
    const newMessages = [];
    
    if (flash?.success) {
      newMessages.push({
        id: `success-${Date.now()}`,
        type: 'success',
        message: flash.success
      });
    }
    
    if (flash?.error) {
      newMessages.push({
        id: `error-${Date.now()}`,
        type: 'error',
        message: flash.error
      });
    }
    
    if (flash?.warning) {
      newMessages.push({
        id: `warning-${Date.now()}`,
        type: 'warning',
        message: flash.warning
      });
    }
    
    if (flash?.info) {
      newMessages.push({
        id: `info-${Date.now()}`,
        type: 'info',
        message: flash.info
      });
    }

    if (newMessages.length > 0) {
      setMessages(newMessages);
    }
  }, [flash]);

  const removeMessage = (id: string) => {
    setMessages(prev => prev.filter(msg => msg.id !== id));
  };

  if (messages.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-3 w-96 max-w-full">
      {messages.map((message) => (
        <FlashMessage
          key={message.id}
          type={message.type as 'success' | 'error' | 'warning' | 'info'}
          message={message.message}
          onClose={() => removeMessage(message.id)}
          autoClose={true}
          duration={5000}
        />
      ))}
    </div>
  );
};

export default FlashMessages;