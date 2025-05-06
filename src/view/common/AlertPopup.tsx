import {notification } from "antd";
import type { NotificationArgsProps } from 'antd';

type NotificationPlacement = NotificationArgsProps['placement'];

export const useAlertPopup = () => {
  const [api, contextHolder] = notification.useNotification();

  return {
    contextHolder,
    success: (config: NotificationArgsProps) => {
      api.success({
        message: config.message,
        description: config.description,
        placement: config.placement,
        btn: config.btn,
        onClick: config.onClick,
        onClose: config.onClose,
      });
    },
    info: (config: NotificationArgsProps) => {
      api.info({
        message: config.message,
        description: config.description,
        placement: config.placement,
        btn: config.btn,
        onClick: config.onClick,
        onClose: config.onClose,
      });
    },
    warning: (config: NotificationArgsProps) => {
      api.warning({
        message: config.message,
        description: config.description,
        placement: config.placement,
        btn: config.btn,
        onClick: config.onClick,
        onClose: config.onClose,
      });
    },
    error: (config: NotificationArgsProps) => {
      api.error({
        message: config.message,
        description: config.description,
        placement: config.placement,
        btn: config.btn,
        onClick: config.onClick,
        onClose: config.onClose,
      });
    }
  };
};