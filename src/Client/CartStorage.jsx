import { create } from 'zustand'
import { persist } from 'zustand/middleware'

const useCart = create(
  persist(
    (set, get) => ({
      cartItems: [],

      addToCart: (product) => {
        const existing = get().cartItems.find(item => item.id === product.id)
        if (existing) {
          // already in cart — just increase quantity
          set({
            cartItems: get().cartItems.map(item =>
              item.id === product.id
                ? { ...item,
                quantity: item.quantity + 1 }
                : item
            )
          })
        } else {
          // new item — add with quantity 1
          set({ cartItems: [
            ...get().cartItems, 
            { ...product, quantity: 1 }
            ]
          })
        }
      },

      removeFromCart: (id) => {
        set({ cartItems: get().cartItems.filter(item => item.id !== id) })
      },

      increaseQuantity: (id) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          )
        })
      },

      decreaseQuantity: (id) => {
        set({
          cartItems: get().cartItems.map(item =>
            item.id === id && item.quantity > 1
              ? { ...item, quantity: item.quantity - 1 }
              : item
          )
        })
      },

      clearCart: () => set({ cartItems: [] }),
      
      
    }),
    
    { name: 'cheddar-cart' }
  )
)

export default useCart