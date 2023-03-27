import Image from 'next/image';

const Page = ({ data }) => {
  return (
    <div>
      <Image src={data.image} width={600} height={400} alt={data.title} />
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
};

export default Page;

export async function getStaticPaths() {
  const data = await import('/data/data.json');

  const { allEvents } = data;
  const allPaths = allEvents?.map((path) => {
    return {
      params: {
        cats: path.city,
        id: path.id,
      },
    };
  });

  return {
    paths: allPaths,
    fallback: false,
  };
}

export async function getStaticProps(context) {
  console.log(context);
  const id = context.params.id;
  const { allEvents } = await import('/data/data.json');
  const eventData = allEvents.find((ev) => ev.id === id);

  return {
    props: {
      data: eventData,
    },
  };
}
