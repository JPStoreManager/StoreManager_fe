import {notification } from "antd";
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

export const useAlertPopup = () => {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    success: (title: string, msg: string, placement: NotificationPlacement) => {
      api.success({
        message: title,
        description: msg,
        placement,
      });
    },
    info: (title: string, msg: string, placement: NotificationPlacement) => {
      api.info({
        message: title,
        description: msg,
        placement,
      });
    },
    warning: (title: string, msg: string, placement: NotificationPlacement) => {
      api.warning({
        message: title,
        description: msg,
        placement,
      });
    },
    error: (title: string, msg: string, placement: NotificationPlacement) => {
      api.error({
        message: title,
        description: msg,
        placement,
      });
    }
  };
};