
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const existing = get().cartItems.find(item => item.id === product.id)
        if (existing) {
          // product already in cart — increase quantity by 1
          set({
            cartItems: get().cartItems.map(item =>
              item.id === product.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          // new product — add to cart with quantity 1
          set({
            cartItems: [
              ...get().cartItems,
              {
                ...product,
                quantity: 1,
                // set selectedColor to first color in array by default
                // falls back to null if product has no colorAvailable
                selectedColor: product.colorAvailable?.[0] || null,
              }
            ]
          })
        }
      },

      // remove product from cart by id
      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter(item => item.id !== id) })
      },

      // increase quantity of a specific cart item by id
      increaseQuantity: (id) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        })
      },

      // decrease quantity of a specific cart item by id — stops at 1
      decreaseQuantity: (id) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        })
      },

      // update selected color of a specific cart item by id
      // called when user taps a color dot in the cart
      updateItemColor: (id, color) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id ? { ...item, selectedColor: color } : item
          )
        })
      },

      // clear all items from cart
      clearCart: () => set({ cartItems: [] }),
    }),
    { name: 'cheddar-cart' }
  )
)

export default useCart
