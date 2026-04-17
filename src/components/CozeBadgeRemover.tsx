"use client";

import { useEffect } from "react";

export function CozeBadgeRemover() {
  useEffect(() => {
    const removeBadge = () => {
      const badge = document.getElementById('coze-coding-badge');
      if (badge) badge.remove();
    };

    removeBadge();

    const observer = new MutationObserver(() => {
      removeBadge();
    });

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, []);

  return null;
}
