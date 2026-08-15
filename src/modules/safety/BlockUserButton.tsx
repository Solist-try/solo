import { Button } from "../../components/ui";
import { useSafety } from "./useSafety";
import styles from "./BlockUserButton.module.css";

export function BlockUserButton({
  userId,
  userName,
  size = "sm",
}: {
  userId: string;
  userName: string;
  size?: "sm" | "md";
}) {
  const { isBlocked, blockUser, unblockUser } = useSafety();
  const blocked = isBlocked(userId);

  return (
    <Button
      type="button"
      size={size}
      variant={blocked ? "soft" : "outline"}
      className={styles.button}
      onClick={() =>
        blocked
          ? unblockUser(userId)
          : blockUser({ id: userId, name: userName })
      }
    >
      {blocked ? "Unblock" : "Block"}
    </Button>
  );
}
