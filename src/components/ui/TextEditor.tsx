import React, { useRef, useEffect } from "react";
import Button from "./Button";
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  ListOrdered,
  List,
  IndentDecrease,
  IndentIncrease,
  Link,
  Plus,
  Minus,
} from "lucide-react";
import "@/styles/components/texteditor.css";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Write something...",
  className = "",
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fontInputTRef = useRef<HTMLInputElement>(null);
  const [isBoldOn, setIsBoldOn] = React.useState(false);
  const [isItalicOn, setIsItalicOn] = React.useState(false);
  const [isUnderlineOn, setIsUnderlineOn] = React.useState(false);
  const [isListOn, setIsListOn] = React.useState(false);
  const [isLinkOn, setIsLinkOn] = React.useState(false);
  const [isAlignLeftOn, setIsAlignLeftOn] = React.useState(false);
  const [isAlignCenterOn, setIsAlignCenterOn] = React.useState(false);
  const [isAlignRightOn, setIsAlignRightOn] = React.useState(false);
  const [isIndentOn, setIsIndentOn] = React.useState(false);
  const [isOutdentOn, setIsOutdentOn] = React.useState(false);
  const [isNumberedListOn, setIsNumberedListOn] = React.useState(false);
  const [isBulletedListOn, setIsBulletedListOn] = React.useState(false);
  const [fontSize, setFontSize] = React.useState("16");
  const [showFontSizeDropdown, setShowFontSizeDropdown] =
    React.useState<boolean>(false);
  const [selectionForFontSize, setSelectionForFontSize] =
    React.useState<Range | null>(null);

  // Map common font sizes to document.execCommand's numeric values (1-7)
  const fontSizeMap: { [key: string]: string } = {
    "8": "1",
    "10": "2",
    "12": "3",
    "16": "3",
    "18": "4",
    "24": "5",
    "30": "6",
    "36": "6",
    "48": "7",
  };

  const handleFormat = (command: string, val: string = "") => {
    document.execCommand(command, false, val);

    // Update the content
    const updatedContent = editorRef.current?.innerHTML;
    if (updatedContent !== undefined) {
      onChange(updatedContent);
    }
  };

  const handleFontSizeChange = (selectedSize: string) => {
    const span = `<span style="font-size: ${selectedSize}px">${window
      .getSelection()
      ?.toString()}</span>`;
    document.execCommand("insertHTML", true, span);
    
    // Update the content
    const updatedContent = editorRef.current?.innerHTML;
    if (updatedContent !== undefined) {
      onChange(updatedContent);
    }

    setFontSize(selectedSize); // Update state to reflect the selected display value
  };

  const handleFontInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setFontSize(inputValue);
  };
  const increaseFontSize = () => {
    const currentSize = parseInt(fontSize);
    if (currentSize < 48) {
      handleFontSizeChange((currentSize + 1).toString());
    }
  };

  const decreaseFontSize = () => {
    const currentSize = parseInt(fontSize);
    if (currentSize > 8) {
      handleFontSizeChange((currentSize - 1).toString());
    }
  };

  const toggleBold = () => {
    handleFormat("bold");
    setIsBoldOn((prev) => !prev);
  };
  const toggleItalic = () => {
    handleFormat("italic");
    setIsItalicOn((prev) => !prev);
  };
  const toggleUnderline = () => {
    handleFormat("underline");
    setIsUnderlineOn((prev) => !prev);
  };
  const toggleAlignLeft = () => {
    handleFormat("justifyLeft");
    setIsAlignLeftOn((prev) => !prev);
  };
  const toggleAlignCenter = () => {
    handleFormat("justifyCenter");
    setIsAlignCenterOn((prev) => !prev);
  };
  const toggleAlignRight = () => {
    handleFormat("justifyRight");
    setIsAlignRightOn((prev) => !prev);
  };
  const toggleIndent = () => {
    handleFormat("indent");
    setIsIndentOn((prev) => !prev);
  };
  const toggleOutdent = () => {
    handleFormat("outdent");
    setIsOutdentOn((prev) => !prev);
  };

  const toggleNumberedList = () => {
    handleFormat("insertOrderedList");
    setIsNumberedListOn((prev) => !prev);
  };
  const toggleBulletedList = () => {
    handleFormat("insertUnorderedList");
    setIsBulletedListOn((prev) => !prev);
  };
  const toggleLink = () => {
    const url = prompt("Enter link URL:");
    if (url) {
      handleFormat("createLink", url);
      setIsLinkOn((prev) => !prev);
    }
  };
  const toggleShowFontSizeDropdown = () => {
    setShowFontSizeDropdown((prev) => !prev);
  };
  const handleButtonChooseFont = (size: string) => {
    handleFontSizeChange(size);
    setShowFontSizeDropdown(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!e.ctrlKey && !e.metaKey) return;

      switch (e.key.toLowerCase()) {
        case "b":
          e.preventDefault();
          toggleBold();
          break;
        case "i":
          e.preventDefault();
          toggleItalic();
          break;
        case "u":
          e.preventDefault();
          toggleUnderline();
          break;
        default:
          break;
      }
    };

    const currentEditor = editorRef.current;
    if (currentEditor) {
      currentEditor.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      if (currentEditor) {
        currentEditor.removeEventListener("keydown", handleKeyDown);
      }
    };
  }, [toggleBold, toggleItalic, toggleUnderline]);

  // use effect for the enter key press for the fontinput to submit the input
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter") {
        handleFontSizeChange(fontSize);
        setShowFontSizeDropdown(false);
      }
    };

    const currentInput = fontInputTRef.current;
    if (currentInput) {
      currentInput.addEventListener("keypress", handleKeyPress);
    }
    return () => {
      if (currentInput) {
        currentInput.removeEventListener("keypress", handleKeyPress);
      }
    };
  }, []);

  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  return (
    <div className={`border relative rounded-md flex flex-col ${className}`}>
      {/* {showFontSizeDropdown && (
        <div className="font-size-dropdown-options absolute flex flex-col w-4 b-0">
          {Object.keys(fontSizeMap).map((size) => (
            <button
              onClick={() => handleButtonChooseFont(size)}
              key={size}
              className="size-option-btn"
            >
              {size}
            </button>
          ))}
        </div>
      )} */}
      <div className="relative editor-btn-con padding-2 flex gap-2">
        <Button
          variant="ghost"
          size="md"
          onClick={toggleBold}
          type="button"
          active={isBoldOn}
        >
          <Bold className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleItalic}
          active={isItalicOn}
          type="button"
        >
          <Italic className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleUnderline}
          active={isUnderlineOn}
          type="button"
        >
          <Underline className="h-4 w-4" />
        </Button>
        {/* <div className="font-adjust-con flex gap-2 items-center">
          <Button
            onClick={decreaseFontSize}
            variant="ghost"
            size="md"
            type="button"
          >
            <Minus className="h-4 w-4" />
          </Button>
          <input
            type="text"
            onFocus={toggleShowFontSizeDropdown}
            onBlur={toggleShowFontSizeDropdown}
            value={fontSize}
            onChange={handleFontInputChange}
            className=" padding-2 w-10 text-center border rounded-md"
          />

          <Button
            onClick={increaseFontSize}
            variant="ghost"
            size="md"
            type="button"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div> */}

        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          variant="ghost"
          size="md"
          onClick={toggleAlignLeft}
          active={isAlignLeftOn}
          type="button"
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleAlignCenter}
          active={isAlignCenterOn}
          type="button"
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleAlignRight}
          active={isAlignRightOn}
          type="button"
        >
          <AlignRight className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          variant="ghost"
          size="md"
          onClick={toggleNumberedList}
          active={isNumberedListOn}
          type="button"
        >
          <ListOrdered className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleBulletedList}
          active={isBulletedListOn}
          type="button"
        >
          <List className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleOutdent}
          active={isListOn}
          type="button"
        >
          <IndentDecrease className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="md"
          onClick={toggleIndent}
          active={isIndentOn}
          type="button"
        >
          <IndentIncrease className="h-4 w-4" />
        </Button>
        <div className="w-px h-6 bg-gray-200 mx-1" />
        <Button
          variant="ghost"
          size="md"
          onClick={toggleLink}
          active={isLinkOn}
          type="button"
        >
          <Link className="h-4 w-4" />
        </Button>
      </div>

      {/* ContentEditable DIV instead of textarea */}
      <div className="relative">
        {(!value || value === "<br>") && (
          <div className="placeholder-text">{placeholder}</div>
        )}

        <div
          ref={editorRef}
          className="texteditor-area outline-none p-2"
          contentEditable
          onInput={() => {
            const updatedContent = editorRef.current?.innerHTML ?? "";
            onChange(updatedContent);
          }}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
