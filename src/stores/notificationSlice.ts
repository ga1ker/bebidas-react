import { StateCreator } from "zustand"
import { FavoriteSliceType } from "./favoritesSlice"

type Notification = {
    text: string
    error: boolean
    show: boolean
}

export type NotificationSliceType = {
    notification: Notification
    showNotification: (payload: Pick<Notification, 'text' | 'error'>) => void
    closeNotification: () => void
}

export const createNotificationSlice: StateCreator<NotificationSliceType & FavoriteSliceType, [], [], NotificationSliceType> = (set, get) => ({
    notification: {
        text: '',
        error: false,
        show: false
    },
    showNotification: (payload) => {
        set({
            notification: {
                text: payload.text,
                error: payload.error,
                show: true
            }
        })
        setTimeout(() => {
            get().closeNotification()
        }, 2000)
    },
    closeNotification: () => {
        console.log('cerrado');
        set({
            notification: {
                text: '',
                error: false,
                show: false
            }
        })
    }
})