declare global {
  interface Liveblocks {
    Presence: {
      // Real-time cursor / selection could go here if added later
    };

    Storage: {};

    UserMeta: {
      id: string;
      info: {
        id: string;
        name: string;
        email: string;
        avatar: string;
        color: string;
      };
    };

    RoomEvent: {};

    ThreadMetadata: {};

    RoomInfo: {};
  }
}

export {};
