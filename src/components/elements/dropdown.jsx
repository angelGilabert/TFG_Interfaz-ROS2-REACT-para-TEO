import Dropdown from 'rc-dropdown';
import Menu, { Item as MenuItem } from 'rc-menu';
import 'rc-dropdown/assets/index.css';
import 'rc-menu/assets/index.css';


export function CustomDropdown({ actual_state, setState, states, name_states = null, index = null, style = {} }) {

    const handleSelect = ({ key }) => {
        if (index !== null) {
            setState(key, index);
        } else {
            setState(key);
        }
    };

    const menu = (
        <Menu onClick={handleSelect}>
            {states.map((state, index) => (
                <MenuItem key={state}>
                    {name_states ? name_states[index] : state}
                </MenuItem>
            ))}
        </Menu>
    );

    return (
        <div style={{ padding: '50px', fontFamily: 'sans-serif' }}>
            <Dropdown overlay={menu} trigger={['click']}>
                <button style={{
                    ...style
                }}>
                    {name_states ? name_states[states.indexOf(actual_state)] : actual_state}
                    <span style={{ marginLeft: '10px' }}>▼</span>

                </button>
            </Dropdown>
        </div>
    );
}
