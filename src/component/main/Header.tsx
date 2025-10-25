import { useNavigate } from "react-router-dom"
import { Dropdown, Menu } from 'antd';
import { Option } from "../../model/layout";

const HeaderLogo: React.FC = () => {
  const navigator = useNavigate();

  return (          
    <div className='logo' onClick={() => navigator('/')}>
      <a style={{color: 'white'}}>Jumping Park</a>
    </div>
  )
}

const TextSelectBox: React.FC<{ options: Option[] }> = ({ options }) => {
  const menu = (
    <Menu>
      {options.map(option => (
        <Menu.Item key={option.value}>{option.label}</Menu.Item>
      ))}
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={['click']}>
      <span style={{ cursor: 'pointer' }}>user name</span>
    </Dropdown>
  );
};

// 사용 예시
const options: Option[] = [
  { value: '1', label: 'Option 1' },
  { value: '2', label: 'Option 2' },
  { value: '3', label: 'Option 3' },
];

const HeaderUser: React.FC = () => {
  return (
    <div className='header-user-name'>
      <div className="app">
        <TextSelectBox options={options} />
      </div>
    </div>
  );
};

export {HeaderLogo, HeaderUser};