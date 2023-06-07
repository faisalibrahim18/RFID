import { ThreeCircles } from "react-loader-spinner";

const Loading = () => {
  return (
    <div className="flex h-96 w-full">
      <div className="m-auto">
        <ThreeCircles
          height="100"
          width="100"
          color="#4fa94d"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
          ariaLabel="three-circles-rotating"
          outerCircleColor=""
          innerCircleColor=""
          middleCircleColor=""
        />
      </div>
    </div>
  );
};

export default Loading;
