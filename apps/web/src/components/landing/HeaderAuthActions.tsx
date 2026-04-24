"use client";

import { useAuthQuery, useLogoutMutation } from "@/features/auth/hooks";
import { ActionButton } from "./shared";

type HeaderAuthActionsProps = {
  startTrainingLabel: string;
  logoutLabel: string;
  direction?: "row" | "column";
  onAction?: () => void;
};

export function HeaderAuthActions({
  startTrainingLabel,
  logoutLabel,
  direction = "row",
  onAction,
}: HeaderAuthActionsProps) {
  const { data } = useAuthQuery();
  const { mutate, isPending } = useLogoutMutation();

  const isLoggedIn = data?.isLoggedIn ?? true;
  const layoutClassName =
    direction === "column"
      ? "flex flex-col gap-3"
      : "flex items-center gap-3";

  function handleStartTrainingClick() {
    onAction?.();
  }

  function handleLogoutClick() {
    mutate(undefined, {
      onSuccess: () => {
        onAction?.();
      },
    });
  }

  return (
    <div className={layoutClassName}>
      <a href="#cta" onClick={handleStartTrainingClick}>
        <ActionButton>{startTrainingLabel}</ActionButton>
      </a>

      {isLoggedIn ? (
        <button
          className="disabled:cursor-not-allowed disabled:opacity-60"
          disabled={isPending}
          onClick={handleLogoutClick}
          type="button"
        >
          <ActionButton variant="secondary">
            {isPending ? "Loading..." : logoutLabel}
          </ActionButton>
        </button>
      ) : null}
    </div>
  );
}
