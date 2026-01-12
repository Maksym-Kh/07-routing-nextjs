import css from "./layout.module.css";

interface Props {
  children: React.ReactNode;
  sidebar: React.ReactNode;
}

export default function FilterLayout({ children, sidebar }: Props) {
  return (
    <div className={css.filterContainer}>
      <aside className={css.sidebarWrapper}>{sidebar}</aside>
      <main className={css.contentWrapper}>{children}</main>
    </div>
  );
}
