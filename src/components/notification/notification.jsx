import { notification } from 'antd'

export const openNotification = (type, message, description) => {
    return notification[type]({message, description})
}