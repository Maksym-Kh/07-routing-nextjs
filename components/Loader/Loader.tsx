import css from "./Loader.module.css";
import { ThreeDots } from "react-loader-spinner";

export default function Loader() {
  return (
    <div className={css.wrapper}>
      <ThreeDots color="#007bff" height={80} width={80} />
    </div>
  );
}
