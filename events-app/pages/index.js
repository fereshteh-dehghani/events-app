import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home({ data }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Events App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <nav>
          <a href="/">Home</a>
          <a href="/events">Events</a>
          <a href="/about-us">About Us</a>
        </nav>
      </header>
      <main className={styles.main}>
        {data?.map((ev) => (
          <a key={ev.id} href={`/events/${ev.id}`}>
            <Image src={ev.image} alt={ev.title} width={200} height={100} />
            <h2>{ev.title}</h2>
            <p>{ev.description}</p>
          </a>
        ))}
      </main>

      <footer className={styles.footer}></footer>
    </div>
  );
}

export async function getServerSideProps() {
  const { events_categories } = await import('/data/data.json');
  return {
    props: {
      data: events_categories,
    },
  };
}
