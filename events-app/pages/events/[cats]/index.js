import Image from 'next/image';

const EventsCatpage = ({ data }) => {
  return (
    <div>
      <div>
        {data?.map((ev) => (
          <Link
            key={ev.id}
            href={`/events/${ev.city}/${ev.id}`}
            passHref={true}
          >
            <a>
              <Image src={ev.image} width={300} height={300} alt={ev.title} />
              <h2>{ev.title}</h2>
              <p>{ev.description}</p>
            </a>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default EventsCatpage;

export async function getStaticPaths() {
  const { events_categories } = await import('/data/data.json');
  const allPaths = events_categories?.map((ev) => {
    return {
      params: {
        cats: ev.id.toString(),
      },
    };
  });

  return {
    paths: allPaths || [],
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context?.params.cats;
  const { allEvents } = await import('/data/data.json');
  const data = allEvents.filter((ev) => ev.city === id);
  return {
    props: { data },
  };
}
