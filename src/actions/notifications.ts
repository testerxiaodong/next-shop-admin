'use server'

import { createClient } from '@/supabase/server'

/**
 * 通过EXPO HTTP/2 API 向用户发送通知，具体请查看文档：https://docs.expo.dev/push-notifications/sending-notifications/#http2-api
 * @param expoPushToken 用户的 Expo push notification token
 * @param title 通知标题
 * @param body 通知内容
 */
async function sendPushNotification({
  expoPushToken,
  title,
  body,
}: {
  expoPushToken: string
  title: string
  body: string
}) {
  const message = {
    to: expoPushToken,
    sound: 'default',
    title,
    body,
    data: { someData: 'goes here' },
  }

  await fetch('https://exp.host/--/api/v2/push/send', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Accept-encoding': 'gzip, deflate',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(message),
  })
}

/**
 * 根据userId 查询用户的 Expo push notification token
 * @param userId 用户 ID
 * @returns 用户的 Expo push notification token
 */
export const getUserNotificationToken = async (userId: string) => {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from('users')
    .select('expo_notification_token')
    .eq('id', userId)
    .single()

  if (error) throw new Error(error.message)

  return data
}

export const sendNotification = async (userId: string, status: string) => {
  const tokenData = await getUserNotificationToken(userId)

  if (!tokenData.expo_notification_token) {
    return
  }

  await sendPushNotification({
    expoPushToken: tokenData.expo_notification_token,
    title: 'Your Order Status',
    body: `Your order is now ${status}`,
  })
}
