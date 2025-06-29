const LoadingWisataCard = () => {
  return (
    <div className="w-full h-96 rounded-2xl overflow-hidden shadow-lg bg-gray-200 animate-pulse relative">
      <div className="w-full h-96 bg-gray-300" />

      <div className="absolute top-4 right-4 w-20 h-7 bg-gray-400 rounded-full" />

      <div className="absolute bottom-0 left-0 p-6 text-white w-full space-y-2">
        <div className="w-3/4 h-5 bg-gray-400 rounded" />
        <div className="w-full h-4 bg-gray-400 rounded" />
        <div className="w-5/6 h-4 bg-gray-400 rounded" />
      </div>
    </div>
  );
};

export default LoadingWisataCard;
