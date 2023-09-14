

export const modifyCartItemQuantity = (cartItem: CartItem, modifier: number) => {
  return {
    ...cartItem,
    quantity: cartItem.quantity + modifier,
  };
}