import StartUpCard from "@/components/StartUpCard";
import SearchForm from "../../components/SearchForm";

export default async function Home({ searchParams }: {
  searchParams: Promise<{ query: string }>;
}) {

  const query = (await searchParams).query

  const posts = [{
    id: 1,
    _createdAt: new Date(),
    views: 50,
    desc: "this is description",
    image: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    category: "this is category",
    title: "this is title",
    author: {
      _id: 1,
      name: "Ahmed",
    }
  }]

  return (
    <>

      <section className="pink_container">
        <h1 className="heading">Share Your Startup,
          <br />Grow Your Business
        </h1>

        <p className="sub-heading !max-w-3xl ">
          Submit Ideas, Get Funding, Grow Your Business
        </p>

        <SearchForm query={query} />

      </section>

      <section className="section_container">
        <p className="text-30-semibold">
          {
            query
              ? `Search results for: ${query}`
              : "Latest Startups"
          }
        </p>

        <ul className="mt-7 card_grid">
          {
            posts.length > 0 && posts.map((post: StartupCardType) => {
              return (
                <StartUpCard key={post?.id} post={post} />
              )
            })
          }
        </ul>

      </section>


    </>
  );
}
