import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import useCurrentUser from "@/hooks/useCurrentUser";
import Navbar from "@/components/Navbar";
import Billboard from "../components/Billboard";
import Movielist from "@/components/Movielist";
import useMovielist from "@/hooks/useMovielist";
import useFavorites from "@/hooks/useFavorites";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}
export default function Home() {
  const { data: user } = useCurrentUser();
  const { data: movies = [] } = useMovielist();
  const { data: favorites = [] } = useFavorites();

  return (
    <>
      <Navbar user={user} />
      <Billboard />
      <div className="pb-40">
        <Movielist title="Trending Now" data={movies} />
        <Movielist title="My List" data={favorites} />
      </div>
      {/* <h1 className="text-2xl text-white">Netflix</h1>
      <p className="text-white">Name: {user?.name}</p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Sign Out
      </button> */}
    </>
  );
}
