import { Oval } from "react-loader-spinner";

const Loading = () => {
  return (
    <Oval
      height={80}
      width={80}
      color="#DC3545"
      wrapperStyle={{}}
      wrapperClass=""
      visible={true}
      ariaLabel="oval-loading"
      secondaryColor="#DC2545"
      strokeWidth={3}
      strokeWidthSecondary={4}
    />
  );
};

export default Loading;
