import Image from 'next/image';

const Loader = () => {
  return (
    <div className="loader">
      <Image
        src="/assets/icons/loader.svg"
        alt="Loading…"
        width={32}
        height={32}
        className="animate-spin"
      />
      <span className="sr-only">Loading</span>
    </div>
  );
};

export default Loader;
