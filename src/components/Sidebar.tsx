import { useGetLessonsQuery } from "../graphql/generated";
import { Lesson } from "./Lesson";

import ContentLoader from "react-content-loader";

export function Sidebar() {
  const { data } = useGetLessonsQuery();

  localStorage.setItem("slug", data?.lessons[0].slug!);

  const MyLoader = () => (
    <ContentLoader
      width={100}
      speed={1}
      backgroundColor={'#333'}
      foregroundColor={'#999'}
      viewBox="0 0 380 100"
      style={{ width: '100%' }}
    >
      <rect x="0" y="20" rx="10" ry="10" width="260" height="20" />
      <rect x="280" y="20" rx="10" ry="10" width="100" height="20" />
      <rect x="0" y="60" rx="10" ry="10" width="380" height="20" />
    </ContentLoader>
  );

  return (
    <aside className="w-[348px] bg-gray-700 p-6 border-l border-gray-600 z-[1000]">
      <span className="font-bold text-2xl pb-6 mb-6 border-b border-gray-500 block">
        Cronograma de aulas
      </span>

      <div className="flex flex-col gap-8">

        {
          !data?.lessons.length
          ? 
            <div className="relative rounded border border-gray-500 p-4 mt-2">
              <MyLoader />
            </div>
          : 
            data?.lessons.map(lesson => {
              return (
                <Lesson
                  key={lesson.id}
                  title={lesson.title}
                  slug={lesson.slug}
                  availableAt={new Date(lesson.availableAt)}
                  type={lesson.lessonType}
                />
              )
            })
        }
      </div>
    </aside>
  )
}