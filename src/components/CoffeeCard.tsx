import { Dimensions, ImageBackground, StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import {
    BORDERRADIUS,
    COLORS,
    FONTFAMILY,
    FONTSIZE,
    SPACING,
} from '../theme/theme';
import CustomIcon from './CustomIcon';
import BGIcon from './BGIcon';

const CARD_WIDTH = Dimensions.get('window').width * 0.32;
interface CoffeCardProps {
    item: any;
    buttonPressHandler: (item: any) => void;
}

const CoffeeCard: React.FC<CoffeCardProps> = ({ item, buttonPressHandler }) => {
    return (
        <LinearGradient
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.CardLinearGradientContainer}
            colors={[COLORS.primaryGreyHex, COLORS.primaryBlackHex]}
        >
            <ImageBackground
                source={item.imagelink_square}
                style={styles.CardImageBG}
                resizeMode='cover'
            >
                <View style={styles.CardRatingContainer}>
                    <CustomIcon
                        name='star'
                        size={FONTSIZE.size_18}
                        color={COLORS.primaryOrangeHex}
                    />
                    <Text style={styles.CardRatingText}>{item.average_rating}</Text>
                </View>
            </ImageBackground>
            <Text style={styles.CardTitle}>
                {item.name}
            </Text>
            <Text style={styles.CardSubtitle}>
                {item.special_ingredient}
            </Text>

            <View style={styles.CardFooterRow}>
                <Text style={styles.CardPriceCurrency}>
                    $ <Text style={styles.CardPrice}>{item.prices[2].price}</Text>
                </Text>
                <TouchableOpacity onPress={() => buttonPressHandler({
                    id: item.id,
                    index: item.index,
                    name: item.name,
                    roasted: item.roasted,
                    imagelink_square: item.imagelink_square,
                    special_ingredient: item.special_ingredient,
                    type: item.type,
                    prices: [{...item.prices[2], quantity: 1}]
                })}>
                    <BGIcon
                        color={COLORS.primaryWhiteHex}
                        name={'add'}
                        BGColor={COLORS.primaryOrangeHex}
                        size={FONTSIZE.size_10}
                    />
                </TouchableOpacity>
            </View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    CardLinearGradientContainer: {
        padding: SPACING.space_15,
        borderRadius: BORDERRADIUS.radius_25,
    },
    CardImageBG: {
        width: CARD_WIDTH,
        height: CARD_WIDTH,
        borderRadius: BORDERRADIUS.radius_20,
        marginBottom: SPACING.space_15,
        overflow: 'hidden',
    },
    CardRatingContainer: {
        flexDirection: 'row',
        backgroundColor: COLORS.primaryBlackRGBA,
        alignItems: 'center',
        justifyContent: 'center',
        gap: SPACING.space_10,
        paddingHorizontal: SPACING.space_15,
        position: 'absolute',
        borderBottomLeftRadius: BORDERRADIUS.radius_20,
        borderTopRightRadius: BORDERRADIUS.radius_20,
        top: 0,
        right: 0,
    },
    CardRatingText: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        lineHeight: 22,
        fontSize: FONTSIZE.size_14,
    },
    CardTitle: {
        fontFamily: FONTFAMILY.poppins_medium,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_16,
    },
    CardSubtitle: {
        fontFamily: FONTFAMILY.poppins_light,
        color: COLORS.primaryWhiteHex,
        fontSize: FONTSIZE.size_10,
    },
    CardFooterRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: SPACING.space_15,
    },
    CardPriceCurrency: {
        fontFamily: FONTFAMILY.poppins_semibold,
        color: COLORS.primaryOrangeHex,
        fontSize: FONTSIZE.size_18,
    },
    CardPrice: {
        color: COLORS.primaryWhiteHex,
    },
})

export default CoffeeCard
