import { MenuOption } from 'react-native-popup-menu';

export const MenuItems = ({ text, action, value, icon }) => {
    return (
        <MenuOption onSelect={() => action(value)}>
            <View>

            </View>
        </MenuOption>
    );
}