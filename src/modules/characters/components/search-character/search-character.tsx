"use client";

import { FC, useEffect, useState } from "react";

import styles from "./search-character.module.scss";
import { MagnifyingGlass, User } from "@phosphor-icons/react/dist/ssr";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebounce } from "@/config/hooks/debounce.hook";

interface SearchCharacterProps {
  className?: string;
}

const SearchCharacter: FC<SearchCharacterProps> = ({ className }) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();

  const [search, setSearch] = useState(searchParams.get("s") || "");
  const debouncedValue = useDebounce(search, 500);

  useEffect(() => {
    const search = searchParams.get("s");
    if (search !== debouncedValue.trim()) {
      router.push(`${pathname}?s=${debouncedValue.trim()}`);
    }
  }, [debouncedValue, searchParams, pathname, router]);

  return (
    <div className={`${styles.searchCharacter} ${className || ""}`}>
      <MagnifyingGlass className={`${styles.icon} ${styles.iconSearch}`} />
      <input
        type="text"
        placeholder="Find your character..."
        className={styles.input}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <User className={`${styles.icon} ${styles.iconUser}`} />
    </div>
  );
};

export default SearchCharacter;
