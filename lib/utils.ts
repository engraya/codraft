import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = <T>(value: T): T =>
  JSON.parse(JSON.stringify(value));

export const getAccessType = (userType: UserType) => {
  switch (userType) {
    case 'creator':
    case 'editor':
      return ['room:write'];
    case 'viewer':
    default:
      return ['room:read', 'room:presence:write'];
  }
};

export const dateConverter = (timestamp: string): string => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSecs = diffMs / 1000;
  const diffMins = diffSecs / 60;
  const diffHours = diffMins / 60;
  const diffDays = diffHours / 24;

  if (diffDays > 7) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays >= 1) return `${Math.floor(diffDays)} days ago`;
  if (diffHours >= 1) return `${Math.floor(diffHours)} hours ago`;
  if (diffMins >= 1) return `${Math.floor(diffMins)} minutes ago`;
  return 'Just now';
};

const toHex = (n: number) => n.toString(16).padStart(2, '0');

export function getRandomColor(): string {
  const avoidColors = ['#000000', '#ffffff', '#8b4513'];
  let color: string;
  do {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    color = `#${toHex(r)}${toHex(g)}${toHex(b)}`;
  } while (avoidColors.includes(color.toLowerCase()));
  return color;
}

export const brightColors = [
  '#2E8B57', // sea green
  '#FF6EB4', // hot pink
  '#00CDCD', // cyan
  '#FF00FF', // magenta
  '#FF007F', // rose
  '#FFD700', // gold
  '#00CED1', // dark turquoise
  '#FF1493', // deep pink
  '#FF7F50', // coral
  '#9ACD32', // yellow-green
  '#FFA500', // orange
  '#32CD32', // lime green
  '#ADFF2F', // green-yellow
  '#DB7093', // pale violet red
  '#00FF7F', // spring green
  '#FF6347', // tomato
  '#7B68EE', // medium slate blue
  '#20B2AA', // light sea green
  '#FF4500', // orange red
];

export function getUserColor(userId: string): string {
  let sum = 0;
  for (let i = 0; i < userId.length; i++) {
    sum += userId.charCodeAt(i);
  }
  return brightColors[sum % brightColors.length];
}
