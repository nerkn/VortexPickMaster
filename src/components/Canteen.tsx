import { useToast } from "../utils/store/toast";

export function Canteen() {
  let storeToast = useToast();

  return (
    <div className="toastCanteen">
      {storeToast.toasts.map((e, i) => (
        <div className="toastOne" key={e + i}>
          {e}
        </div>
      ))}
    </div>
  );
}
