import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BORDERRADIUS, SPACING } from '../theme/theme';
import CustomIcon from './CustomIcon';

interface BGIconProps {
    name: string;
    size: number;
    color: string;
    BGColor: string;
}

const BGIcon: React.FC<BGIconProps> = ({ name, size, color, BGColor }) => {
    return (
        <View style={[styles.IconBG, {backgroundColor: BGColor}]}>
            <CustomIcon name={name} size={size} color={color} />
        </View>
    )
}

const styles = StyleSheet.create({
    IconBG: {
        height: SPACING.space_30,
        width: SPACING.space_30,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: BORDERRADIUS.radius_8,
    }
})

export default BGIcon
