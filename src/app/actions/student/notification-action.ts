// src/app/actions/student/notification-action.ts

import { Notification } from '@/app/type';

export async function getNotifications(userId: string): Promise<Notification[]> {
  try {
    const response = await fetch(`/api/notifications/${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const notifications: Notification[] = await response.json();
    return notifications;
  } catch (error) {
    console.error('Error fetching notifications:', error);
    return [];
  }
}