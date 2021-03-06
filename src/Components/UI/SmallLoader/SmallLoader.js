import "./SmallLoader.css";

const SmallLoader = ({ size = "sm" }) => {
  return (
    <div className="smallLoader">
      <img
        src="/Images/Extras/SmallLoader.svg"
        alt="Loading....."
        className={`${size}`}
      />
    </div>
  );
};
export default SmallLoader;
