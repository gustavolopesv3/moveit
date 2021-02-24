import { CompletedChallenges } from '../components/CompletedChallenges';
import { Countdow } from '../components/Countdown';
import { ExperienceBar } from '../components/ExperienceBar';
import { Profile } from '../components/Profile';
import styles from '../styles/pages/Home.module.css';
import Head from 'next/head';

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inicio | Move.it</title>
      </Head>
      <ExperienceBar />
      <section>
        <div>
          <Profile />
          <CompletedChallenges />
          <Countdow />
        </div>
        <div></div>
      </section>
    </div>
  );
}
