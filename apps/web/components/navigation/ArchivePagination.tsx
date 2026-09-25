import Link from "next/link";
import styles from "./ArchivePagination.module.css";

export function ArchivePagination({ path, page, totalPages }: { path: string; page: number; totalPages: number }) {
  if (totalPages <= 1) return null;
  const pagePath = (value: number) => value === 1 ? path : `${path}?page=${value}`;

  return (
    <nav className={styles.pagination} aria-label="Archive pages">
      {page > 1 ? <Link href={pagePath(page - 1)} rel="prev">Previous</Link> : <span />}
      <span>Page {page} of {totalPages}</span>
      {page < totalPages ? <Link href={pagePath(page + 1)} rel="next">Next</Link> : <span />}
    </nav>
  );
}
