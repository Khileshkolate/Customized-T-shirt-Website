const Loader = ({ size = 'md', color = 'primary' }) => {
  const sizeClasses = {
    sm: 'w-6 h-6 border-2',
    md: 'w-12 h-12 border-3',
    lg: 'w-16 h-16 border-4'
  };

  const colorClasses = {
    primary: 'border-primary-600 border-t-transparent',
    white: 'border-white border-t-transparent',
    gray: 'border-gray-600 border-t-transparent'
  };

  return (
    <div className="flex items-center justify-center min-h-[200px]">
      <div className={`${sizeClasses[size]} ${colorClasses[color]} rounded-full animate-spin`} />
    </div>
  );
};

export default Loader;