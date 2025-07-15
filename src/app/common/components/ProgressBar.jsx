import { useEffect, useState } from "react";

export default function ProgressBar({color,value}) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    setTimeout(() => setProgress(value)); // Animate after initial render
  }, []);

  console.log(color)

  return (
    <div className="w-full ">
      {/* <h2 className="text-xl font-bold mb-2">Initial animation</h2> */}
      <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className={`h-full  rounded-full transition-all duration-1000`}
          style={{ width: `${progress}%`,backgroundColor:color }}
        />
      </div>
    </div>
  );
}
