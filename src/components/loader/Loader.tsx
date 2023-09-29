import { Oval } from "react-loader-spinner";
const Loader = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#4fa94d"
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#4fa94d"
      strokeWidth={2}
      strokeWidthSecondary={2}
      wrapperStyle={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        background: "rgba(0, 0, 0, 0.5)",
        zIndex: "9999",
        backdropFilter: "blur(5px)",
      }}
    />
  );
};
export default Loader;
