import { useOthers } from '@liveblocks/react/suspense';
import Image from 'next/image';

const ActiveCollaborators = () => {
  const others = useOthers();
  const collaborators = others.map((other) => other.info);

  if (collaborators.length === 0) return null;

  const visible = collaborators.slice(0, 4);
  const overflow = collaborators.length - visible.length;

  return (
    <ul className="collaborators-list" aria-label="Active collaborators">
      {visible.map(({ id, avatar, name, color }) => (
        <li key={id} title={name}>
          <Image
            src={avatar}
            alt={name}
            width={28}
            height={28}
            className="inline-block size-7 rounded-full ring-2 ring-dark-100"
            style={{ border: `2px solid ${color}` }}
          />
        </li>
      ))}
      {overflow > 0 && (
        <li
          className="inline-flex size-7 items-center justify-center rounded-full
                     bg-dark-400 ring-2 ring-dark-100 text-[10px] font-semibold text-[#A1A1AA]"
        >
          +{overflow}
        </li>
      )}
    </ul>
  );
};

export default ActiveCollaborators;
