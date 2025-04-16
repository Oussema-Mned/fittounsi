import React, { useState, ChangeEvent } from 'react';
import { useAuthStore } from '../store/authStore';
import { Button, Input, Card as AntCard, List, Typography, Space, Avatar } from 'antd';
import { SendOutlined, UserOutlined } from '@ant-design/icons';

const { Text } = Typography;

interface MessagesProps {
  coachId: string;
  clientId: string;
  clientName: string;
}

export const Messages: React.FC<MessagesProps> = ({ coachId, clientId, clientName }) => {
  const [message, setMessage] = useState('');
  const { user, messages, sendMessage, markMessageAsRead } = useAuthStore();

  const handleSendMessage = () => {
    if (message.trim() && user) {
      sendMessage(user.role === 'coach' ? clientId : coachId, message.trim());
      setMessage('');
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const conversationMessages = messages.filter(
    msg => (msg.senderId === coachId && msg.receiverId === clientId) ||
           (msg.senderId === clientId && msg.receiverId === coachId)
  );

  return (
    <AntCard title={`Chat with ${clientName}`} style={{ marginBottom: 16 }}>
      <div style={{ height: '400px', overflowY: 'auto', marginBottom: 16 }}>
        <List
          dataSource={conversationMessages}
          renderItem={(msg) => {
            const isOwnMessage = msg.senderId === user?.id;
            return (
              <List.Item style={{ 
                justifyContent: isOwnMessage ? 'flex-end' : 'flex-start',
                padding: '8px 0'
              }}>
                <AntCard
                  style={{
                    maxWidth: '70%',
                    backgroundColor: isOwnMessage ? '#1890ff' : '#f0f0f0',
                    color: isOwnMessage ? 'white' : 'black'
                  }}
                >
                  <Space direction="vertical" size="small">
                    <Text style={{ color: isOwnMessage ? 'white' : 'black' }}>
                      {msg.content}
                    </Text>
                    <Text type="secondary" style={{ fontSize: '12px', color: isOwnMessage ? 'rgba(255,255,255,0.8)' : undefined }}>
                      {new Date(msg.timestamp).toLocaleString()}
                    </Text>
                  </Space>
                </AntCard>
              </List.Item>
            );
          }}
        />
      </div>
      <Space.Compact style={{ width: '100%' }}>
        <Input
          value={message}
          onChange={handleInputChange}
          onPressEnter={handleSendMessage}
          placeholder="Type your message..."
        />
        <Button 
          type="primary" 
          icon={<SendOutlined />}
          onClick={handleSendMessage}
        >
          Send
        </Button>
      </Space.Compact>
    </AntCard>
  );
}; 