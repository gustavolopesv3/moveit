import styles from '../styles/components/Profile.module.css';

export function Profile() {
  return (
    <div className={styles.profileContainer}>
      <img
        src="https://avatars.githubusercontent.com/u/38574162?s=460&u=214063de7a21a67c111c02296c8e4eb9ab251584&v=4"
        alt="Gustavo Lopes"
      />
      <div>
        <strong>Gustavo Lopes</strong>
        <p>Level 1</p>
      </div>
    </div>
  );
}
