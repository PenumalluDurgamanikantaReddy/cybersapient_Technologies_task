function Skeleton({ className = '', ...props }) {
  return (
    <div
      className={`animate-pulse rounded-md bg-gray-300 ${className}`}
      {...props}
    />
  );
}

export default Skeleton;
