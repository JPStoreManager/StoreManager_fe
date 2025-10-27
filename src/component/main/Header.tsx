import { useNavigate } from "react-router-dom"
import { Dropdown, MenuProps } from 'antd';

const HeaderLogo: React.FC = () => {
  const navigator = useNavigate();

  return (          
    <div className='logo' onClick={() => navigator('/')}>
      <a style={{color: 'white'}}>Jumping Park</a>
    </div>
  )
}

const TextSelectBox = () => {
  const items: MenuProps['items'] = [
    {
      key: '1',
      label: 'Profile',
    },
    {
      key: '2',
      label: 'Logout',
      danger: true,
    },
  ];

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    console.log('click', e.key);
  };

  const menuProps = {
    items,
    onClick: handleMenuClick,
  };

  return (
    <Dropdown menu={menuProps} trigger={['click']}>
      <span style={{ cursor: 'pointer' }}>user name</span>
    </Dropdown>
  );
};

const HeaderUser: React.FC = () => {
  return (
    <div className='header-user-name'>
      <div className="app">
        <TextSelectBox />
      </div>
    </div>
  );
};

export {HeaderLogo, HeaderUser};