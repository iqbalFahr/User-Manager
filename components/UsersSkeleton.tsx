// components/UsersSkeleton.jsx
import styles from "../styles/Users.module.css";

export default function UsersSkeleton({ rows = 5 }) {
  return (
    <table className={styles.userTable}>
      <thead>
        <tr>
          <th>NAME</th>
          <th>DEPARTEMENT</th>
          <th>JOB NAME</th>
          <th>ZONE</th>
          <th>ROLE</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {Array.from({ length: rows }).map((_, i) => (
          <tr key={i}>
            <td>
              <div className={styles.userInfo}>
                <div className={`${styles.skeleton} ${styles.avatar}`}></div>
                <div>
                  <div className={`${styles.skeleton} ${styles.textSm}`}></div>
                  <div className={`${styles.skeleton} ${styles.textXs}`}></div>
                </div>
              </div>
            </td>
            <td>
              <div className={`${styles.skeleton} ${styles.textSm}`}></div>
            </td>
            <td>
              <div className={`${styles.skeleton} ${styles.textSm}`}></div>
            </td>
            <td>
              <div className={`${styles.skeleton} ${styles.textSm}`}></div>
            </td>
            <td>
              <div className={`${styles.skeleton} ${styles.badge}`}></div>
            </td>
            <td>
              <div className={`${styles.skeleton} ${styles.action}`}></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
