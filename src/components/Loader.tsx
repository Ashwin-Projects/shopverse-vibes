const Loader = () => {
  return (
    <div className="flex items-center justify-center p-12">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-primary/20"></div>
        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      </div>
    </div>
  );
};

export default Loader;
