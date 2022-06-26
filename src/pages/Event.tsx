import { useState } from "react";
import { useParams } from "react-router";
import { Header } from "../components/Header";
import { Sidebar } from "../components/Sidebar";
import { Video } from "../components/Video";

export function Event() {
  const { slug } = useParams<{ slug: string }>();

  return (
    <div className="flex flex-col min-h-screen">
      <div className="fixed top-0 w-full z-[1000] md:relative">
        <Header />
      </div>

      <main className="flex flex-1 mt-16 md:mt-0">
        {
          slug
            ? <Video lessonSlug={slug} />
            : <div className='flex-1'></div>
        }

        <div className="hidden md:flex">
          <Sidebar />
        </div>
      </main>
    </div>
  )
}