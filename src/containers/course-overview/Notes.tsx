import { Course, UserCourseProgress } from "@/lib/types";
import { useState } from "react";
import RichTextEditor from "@/components/ui/TextEditor";
import { Edit, CheckCircle } from "lucide-react";
import Button from "@/components/ui/Button";
import Loader from "@/components/ui/Loader";
import AIMessageRenderer from "@/components/ui/AIMessageRenderer";

const Notes = ({
  course,
  userCourseProgress,
}: {
  course: Course;
  userCourseProgress: UserCourseProgress;
}) => {
  const [activeTab, setActiveTab] = useState<"course_notes" | "user_notes">(
    "course_notes"
  );
  const [ userNotesToDisplay, setUserNotesToDisplay ] = useState<string>(userCourseProgress.notes || "");
  const [ courseNotesToDisplay, setCourseNotesToDisplay ] = useState<string>(course.notes || "");
  const [userNotes, setUserNotes] = useState<string>(userCourseProgress.notes || "");
  const [courseNotes, setCourseNotes] = useState<string>(course.notes || "");
  const [editingCourseNotes, setEditingCourseNotes] = useState<boolean>(false);
  const [editingUserNotes, setEditingUserNotes] = useState<boolean>(false);
  const [isSavingCourseNotes, setIsSavingCourseNotes] =
    useState<boolean>(false);
  const [isSavingUserNotes, setIsSavingUserNotes] = useState<boolean>(false);
  const handleTabChange = (tab: "course_notes" | "user_notes") => {
    setEditingCourseNotes(false);
    setEditingUserNotes(false);
    setActiveTab(tab);
  };

  const handleUserNotesEdit = () => {
    setEditingUserNotes((prev) => !prev);
  };
  const handleCourseNotesEdit = () => {
    setEditingCourseNotes((prev) => !prev);
  };

  const handleCourseNotesChange = (value: string) => {
    setCourseNotes(value);
  };
  const handleUserNotesChange = (value: string) => {
    setUserNotes(value);
  };
  const handleSaveUserNotes = () => {
    setIsSavingUserNotes(true);
    // Simulate saving to the server
    setTimeout(() => {
      setIsSavingUserNotes(false);
      setEditingUserNotes(false);
      console.log("User notes saved:", userNotes);
    }, 2000);
  };
  const handleSaveCourseNotes = () => {
    setIsSavingCourseNotes(true);
    // Simulate saving to the server
    setTimeout(() => {
      setIsSavingCourseNotes(false);
      setEditingCourseNotes(false);
      console.log("Course notes saved:", courseNotes);
    }, 2000);
  };

  return (
    <div className="notes-wrapper">
      <div className="course-notes-toggle-container">
        <button
          className={`note-type-btn ${
            activeTab === "course_notes" ? "active" : ""
          }`}
          onClick={() => handleTabChange("course_notes")}
        >
          Course notes
        </button>
        <button
          className={`note-type-btn ${
            activeTab === "user_notes" ? "active" : ""
          }`}
          onClick={() => handleTabChange("user_notes")}
        >
          Your notes
        </button>
      </div>
      <div className="course-notes-container">
        <div className="notes-title-con">
          <h3 className="notes-title">
            {activeTab === "course_notes" ? "Course notes" : "Your notes"}
          </h3>
          <button
            className={`notes-edit-btn ${editingCourseNotes ? "active" : ""}`}
            onClick={
              activeTab === "course_notes"
                ? handleCourseNotesEdit
                : handleUserNotesEdit
            }
          >
            <Edit className="notes-icon" />
          </button>
        </div>

        {activeTab === "course_notes" ? (
          courseNotes && courseNotes.length > 0 ? (
            <div className="course-notes-container">
              <AIMessageRenderer content={courseNotesToDisplay} />
            </div>
          ) : (
            <p>This course does not have any notes yet</p>
          )
        ) : userNotes && userNotes.length > 0 ? (
          <div className="course-notes-container">
            <AIMessageRenderer content={userNotesToDisplay} />
          </div>
        ) : (
          <p>You dont have any notes for this course yet.</p>
        )}
        {editingCourseNotes ? (
          <div className="notes-editor">
            <RichTextEditor
              value={courseNotes}
              onChange={handleCourseNotesChange}
            />
            <div className="editor-save-btn-con">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                disabled={isSavingCourseNotes}
                size="sm"
                onClick={handleSaveCourseNotes}
              >
                <div className="flex items-center justify-center gap-2 px-1">
                  {isSavingCourseNotes ? (
                    <Loader styles="loader-icon" size={16} />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  <span className="">Save changes</span>
                </div>
              </Button>
            </div>
          </div>
        ) : editingUserNotes ? (
          <div className="notes-editor">
            <RichTextEditor
              value={userNotes}
              onChange={handleUserNotesChange}
            />
            <div className="editor-save-btn-con">
              <Button variant="outline" size="sm">
                Cancel
              </Button>
              <Button
                disabled={isSavingUserNotes}
                size="sm"
                onClick={handleSaveUserNotes}
              >
                <div className="flex items-center justify-center gap-2 px-1">
                  {isSavingUserNotes ? (
                    <Loader styles="loader-icon" size={16} />
                  ) : (
                    <CheckCircle size={16} />
                  )}
                  <span className="">Save changes</span>
                </div>
              </Button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default Notes;
