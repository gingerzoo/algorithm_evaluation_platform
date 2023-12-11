import { changeNextPathAction } from "@/pages/BasicConfig/store";
import { useAppDispatch } from "@/store";

import { useNavigate } from "react-router-dom";

export default function useNextPathBtn() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (nextPath: string) => {
    dispatch(changeNextPathAction(nextPath));
    navigate(nextPath);
  };
}
