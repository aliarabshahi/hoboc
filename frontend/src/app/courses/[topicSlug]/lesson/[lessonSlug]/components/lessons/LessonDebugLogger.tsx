"use client";

import { useEffect } from "react";

interface LessonDebugLoggerProps {
  lessonData: unknown;
  topicData: unknown;
}

export default function LessonDebugLogger({ lessonData, topicData }: LessonDebugLoggerProps) {
  useEffect(() => {
    console.log("📚 Lesson Data:", lessonData);
    console.log("📂 Topic Data:", topicData);
  }, [lessonData, topicData]);

  return null; // no UI output
}
