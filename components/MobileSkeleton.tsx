// components/MobileSkeleton.jsx
import styles from "../styles/Users.module.css";

export default function MobileSkeleton({ rows = 5 }) {
  return (
    <div className={styles.mobileList}>
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className={styles.mobileCard}>
          <div className={styles.userInfo}>
            <div className={`${styles.skeleton} ${styles.avatar}`}></div>
            <div>
              <div className={`${styles.skeleton} ${styles.textSm}`}></div>
              <div className={`${styles.skeleton} ${styles.textXs}`}></div>
            </div>
          </div>
          <div className={`${styles.skeleton} ${styles.textSm}`}></div>
          <div className={`${styles.skeleton} ${styles.textSm}`}></div>
          <div className={`${styles.skeleton} ${styles.textSm}`}></div>
          <div className={`${styles.skeleton} ${styles.badge}`}></div>
        </div>
      ))}
    </div>
  );
}
