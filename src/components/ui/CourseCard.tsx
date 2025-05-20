import { Course } from "@/lib/types";
import { getDateDescription } from "@/lib/workers";
import Button from "./Button";
import { Progress } from "./Progress";
import Image from "next/image";

export default function CourseCard({ course }: { course: Course }) {
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
        <span className="subtext text-xs">
          Created {getDateDescription(course.created_at)}
        </span>
        <span className="subtext text-xs">
          {course.topics_completed.split("/")[1]} topics
        </span>
      </div>
      <p className="subtext text-sm">{course.description}</p>
      {course.progress ? (
        <div className="flex items-center gap-2">
          <Progress value={course.progress} className="h-2" />

          <span className="text-xs font-medium">{course.progress}%</span>
        </div>
      ) : null }
      <Button variant="primary" size="sm">
        Go to course
      </Button>
    </div>
  );
}
