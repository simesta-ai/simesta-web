import { CourseAbridged } from "@/lib/types";
import { getDateDescription } from "@/lib/workers";
import Button from "./Button";
import { Progress } from "./Progress";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CourseCard({ course }: { course: CourseAbridged }) {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/course/${course.id}`);
  };

  return (
    <div className="card-container flex flex-col gap-4 p-4 rounded-lg">
      <Image
        src={course.image}
        width={500}
        height={200}
        alt={course.title}
        className="w-full h-40 object-cover rounded-lg"
      />
      <h2 className="text-lg font-bold">{course.title}</h2>
      <div className="flex justify-between items-center">
        <span className="subtext font-bold text-xs">
          Created {getDateDescription(course.created_at)}
        </span>
        <span className="subtext font-bold text-xs">{course.level}</span>
      </div>
      <p className="subtext text-sm">{course.description}</p>
      <Button onClick={handleClick} variant="primary" size="sm">
        Go to course
      </Button>
    </div>
  );
}
