'use client';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import {
  InboxNotification,
  InboxNotificationList,
  LiveblocksUIConfig,
} from '@liveblocks/react-ui';
import {
  useInboxNotifications,
  useUnreadInboxNotificationsCount,
} from '@liveblocks/react/suspense';
import Image from 'next/image';
import { Bell } from 'lucide-react';
import { ReactNode } from 'react';

const Notifications = () => {
  const { inboxNotifications }  = useInboxNotifications();
  const { count }               = useUnreadInboxNotificationsCount();

  const unread = inboxNotifications.filter((n) => !n.readAt);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          aria-label={count > 0 ? `${count} unread notifications` : 'Notifications'}
          className="relative flex size-8 items-center justify-center rounded-lg
                     text-[#71717A] transition-all duration-100
                     hover:bg-dark-400 hover:text-[#F4F4F5]
                     focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500/30"
        >
          <Bell className="size-4" strokeWidth={1.75} />

          {count > 0 && (
            <span
              aria-hidden
              className="absolute right-1.5 top-1.5 flex size-1.5 rounded-full bg-blue-500 ring-2 ring-dark-100"
            />
          )}
        </button>
      </PopoverTrigger>

      <PopoverContent align="end" className="shad-popover p-0">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dark-400 px-4 py-3">
          <span className="text-sm font-semibold text-[#F4F4F5]">Notifications</span>
          {count > 0 && (
            <span className="rounded-full bg-blue-500/15 px-2 py-0.5 text-xs font-medium text-blue-400">
              {count} new
            </span>
          )}
        </div>

        <LiveblocksUIConfig
          overrides={{
            INBOX_NOTIFICATION_TEXT_MENTION: (user: ReactNode) => (
              <>{user} mentioned you.</>
            ),
          }}
        >
          <InboxNotificationList>
            {unread.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 py-10 px-4">
                <div className="flex size-10 items-center justify-center rounded-xl bg-dark-400">
                  <Bell className="size-4 text-[#52525B]" strokeWidth={1.5} />
                </div>
                <p className="text-sm font-medium text-[#71717A]">All caught up</p>
                <p className="text-xs text-[#52525B]">No new notifications right now.</p>
              </div>
            )}

            {unread.map((notification) => (
              <InboxNotification
                key={notification.id}
                inboxNotification={notification}
                className="bg-dark-200 text-[#F4F4F5] hover:bg-dark-300 transition-colors"
                href={`/documents/${notification.roomId}`}
                showActions={false}
                kinds={{
                  thread: (props) => (
                    <InboxNotification.Thread
                      {...props}
                      showActions={false}
                      showRoomName={false}
                    />
                  ),
                  textMention: (props) => (
                    <InboxNotification.TextMention {...props} showRoomName={false} />
                  ),
                  $documentAccess: (props) => (
                    <InboxNotification.Custom
                      {...props}
                      title={props.inboxNotification.activities[0].data.title}
                      aside={
                        <InboxNotification.Icon className="bg-transparent">
                          <Image
                            src={(props.inboxNotification.activities[0].data.avatar as string) || ''}
                            width={36}
                            height={36}
                            alt="avatar"
                            className="rounded-full"
                          />
                        </InboxNotification.Icon>
                      }
                    >
                      {props.children}
                    </InboxNotification.Custom>
                  ),
                }}
              />
            ))}
          </InboxNotificationList>
        </LiveblocksUIConfig>
      </PopoverContent>
    </Popover>
  );
};

export default Notifications;
