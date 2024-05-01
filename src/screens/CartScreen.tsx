import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { useStore } from '../store/store';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { COLORS, SPACING } from '../theme/theme';
import HeaderBar from '../components/HeaderBar';
import EmptyListAnimation from '../components/EmptyListAnimation';
import PaymentFooter from '../components/PaymentFooter';
import CartItem from '../components/CartItem';
import { current } from 'immer';

const CartScreen = ({ navigation, route }: any) => {
  const cartList = useStore((state: any) => state.CartList);
  const CartList = useStore((state: any) => state.CartList);
  const CartPrice = useStore((state: any) => state.CartPrice);
  const incrementCartItemQuantity = useStore(
    (state: any) => state.incrementCartItemQuantity,
  );
  const decrementCartItemQuantity = useStore(
    (state: any) => state.decrementCartItemQuantity,
  );
  const calculateCartPrice = useStore((state: any) => state.calculateCartPrice);
  const tabBarHeight = useBottomTabBarHeight();

  const buttonPressHandler = () => {
    navigation.push('Payment', { amount: CartPrice });
  };

  const incrementCartItemQuantityHandler = (id: string, size: string) => {
    incrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  const decrementCartItemQuantityHandler = (id: string, size: string) => {
    decrementCartItemQuantity(id, size);
    calculateCartPrice();
  };

  console.log("cartList: ", cartList.length)
  return (
    <View style={styles.ScreenContainer}>
      <StatusBar backgroundColor={COLORS.primaryBlackHex} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.ScrollViewFlex}
      >
        <View style={[styles.ScrollViewInnerView, { marginBottom: tabBarHeight }]}>
          {/* Cart item list */}
          <View style={styles.ItemContainer}>
            <HeaderBar title='Cart' />
            {
              CartList.length == 0 ? (
                <EmptyListAnimation title={'Cart is Empty'} />
              ) : (
                <View style={styles.ListItemContainer}>
                    {CartList.map((item: any) => (
                      <TouchableOpacity
                        key={item.id}
                        onPress={() => {
                          navigation.push('Details', { item: item });
                        }}
                      >
                        <CartItem
                          item={item}
                          incrementCartItemQuantityHandler={
                            incrementCartItemQuantityHandler
                          }
                          decrementCartItemQuantityHandler={
                            decrementCartItemQuantityHandler
                          }
                        />
                      </TouchableOpacity>
                    ))}
                </View>
            )}
          </View>

          {/* Payment footer */}
          {CartList.length != 0 ? (
            <PaymentFooter
              buttonPressHandler={buttonPressHandler}
              buttonTitle='Pay' price={{ price: CartPrice, currency: '$' }} />
          ) : (
            <></>
          )}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  ScreenContainer: {
    flex: 1,
    backgroundColor: COLORS.primaryBlackHex,
  },
  ScrollViewFlex: {
    flexGrow: 1,
  },
  ScrollViewInnerView: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ItemContainer: {
    flex: 1,
  },
  ListItemContainer: {
    paddingHorizontal: SPACING.space_20,
    gap: SPACING.space_20,
  },
});

export default CartScreen
