// src/pages/UnauthorizedPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Typography } from 'antd';

const { Title, Text } = Typography;

const UnauthorizedPage: React.FC = () => {
  const navigate = useNavigate();

  const handleGoToLogin = () => {
    navigate('/login');
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100%',            // 부모 컨테이너(=LoginLayout의 section)가 이미 화면 높이를 잡아주므로 100% 사용
        textAlign: 'center',       // 텍스트 중앙 정렬
        padding: '0 16px',         // 작게 패딩을 주어 모바일에서도 여백 확보
      }}
    >
      <Title level={2} style={{ marginBottom: 16 }}>
        잘못된 접근입니다.
      </Title>
      <Text style={{ marginBottom: 24, fontSize: 16 }}>
        아래 버튼을 클릭하여 로그인 페이지로 이동해주세요
      </Text>
      <Button type="primary" size="large" onClick={handleGoToLogin}>
        로그인 페이지로 이동
      </Button>
    </div>
  );
};

export default UnauthorizedPage;
