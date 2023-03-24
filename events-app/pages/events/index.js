import Image from 'next/image';

const EventsPage = ({ data }) => {
  return (
    <div>
      {data?.map((ev) => (
        <a key={ev.id} href={`/events/${ev.id}`}>
          <Image src={ev.image} alt={ev.title} width={200} height={100} />

          <h2>{ev.title}</h2>
        </a>
      ))}
    </div>
  );
};

export default EventsPage;

export async function getStaticProps() {
  const { events_categories } = await import('/data/data.json');
  return {
    props: {
      data: events_categories,
    },
  };
}
